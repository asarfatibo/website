import type { Document } from "mongodb";
import { getDb } from "@/lib/db";
import type { Accent } from "@/lib/theme";

export type EventCard = {
  title: string;
  date: string;
  place: string;
  theme: string;
  themeColor: Accent;
  image: string;
};

export const EVENT_IMG_BASE = "https://api.bubbleout.fr:4003/public/event_img/";

/*
  Curation rules (validated, spec §3 S4): public Events only, upcoming, cover
  image required, Montréal scope, titles VERBATIM (never rewritten), no street
  addresses published (venue or city only), dedupe near-identical titles.
*/

const THEME_COLOR: Array<[RegExp, Accent]> = [
  [/musique|vie nocturne|jeux/i, "purple"],
  [/sport|nature|foodie/i, "green"],
  [/bien-être|apéritif|discussion/i, "pink"],
];

function themeColor(theme: string): Accent {
  for (const [re, color] of THEME_COLOR) if (re.test(theme)) return color;
  return "blue";
}

function stripEmoji(s: string): string {
  return s.replace(/[\p{Extended_Pictographic}️]/gu, "").trim();
}

// "2041 R. Saint-Denis, Montréal, QC..." → "Montréal" (never publish street addresses)
// "Parc Jeanne-Mance, Avenue de l'Esplanade, Montreal..." → "Parc Jeanne-Mance"
function publicPlace(localisation: string): string {
  const first = (localisation.split(",")[0] ?? "").trim();
  if (!first || /^\d/.test(first) || /\b(rue|r\.|boul|av\.|avenue)\b/i.test(first.split(" ")[0])) {
    return "Montréal";
  }
  return first;
}

// Dedupe key = sorted word-token set, so near-identical titles that only
// differ in word order or casing collapse (e.g. organizers cross-posting the
// same Event as `Black coffee "OfF Piknic"` and `OfF Piknic "BLACK COFFEE"`).
function normTitle(t: string): string {
  return t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .sort()
    .join(" ");
}

// Shared row → EventCard mapping: applies the curation rules (title floor,
// dedupe, public place, theme colour, fr-CA date) and stops at `limit` cards.
// Rows must already be filtered/sorted by the caller.
function toEventCards(rows: Document[], limit: number): EventCard[] {
  const dateFmt = new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    timeZone: "America/Montreal",
  });

  const seen = new Set<string>();
  const events: EventCard[] = [];
  for (const row of rows) {
    const title = String(row.title ?? "").trim();
    if (title.length < 4) continue;
    const key = normTitle(title);
    if (seen.has(key)) continue;
    seen.add(key);
    const theme = stripEmoji(String(row.frTheme ?? ""));
    events.push({
      title,
      date: dateFmt.format(new Date(row.start_date)),
      place: publicPlace(String(row.localisation ?? "")),
      theme: theme || "Event",
      themeColor: themeColor(theme),
      image: `${EVENT_IMG_BASE}${row.image}`,
    });
    if (events.length >= limit) break;
  }
  return events;
}

// Current year + 0-indexed month as seen in America/Montreal, so "last month"
// rolls over on the 1st in Montréal local time (matches the fr-CA date labels).
function montrealYearMonth(now: Date): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Montreal",
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  return { year: get("year"), month: get("month") - 1 };
}

export async function getUpcomingMontrealEvents(limit = 4): Promise<EventCard[] | null> {
  try {
    const db = await getDb();
    if (!db) return null;

    const rows = await db
      .collection("event_master")
      .aggregate([
        {
          $match: {
            start_date: { $gte: new Date() },
            eventVisibility: "public",
            // NB: no \b word boundaries — MongoDB's PCRE mishandles \b next to
            // the multibyte "é" under $options:"i", silently matching 0 docs.
            localisation: { $regex: "(Montreal|Montréal|Canada)", $options: "i" },
            deletedAt: null,
            image: { $nin: [null, ""] },
          },
        },
        { $sort: { start_date: 1 } },
        { $limit: 20 },
        { $project: { _id: 0, title: 1, start_date: 1, localisation: 1, frTheme: 1, image: 1 } },
      ])
      .toArray();

    // Fewer than 4 showable upcoming Events reads as an empty app — use the
    // curated fallback instead (spec rule).
    const events = toEventCards(rows, limit);
    return events.length >= 4 ? events : null;
  } catch {
    return null;
  }
}

/*
  Home S4 "Les Events du mois dernier" — the most popular Events of the previous
  calendar month in Montréal, live (ISR 1 h) with the curated fallback. Same
  curation rules as getUpcomingMontrealEvents; popularity = distinct engaged
  users in event_like_master (dislikes excluded).
*/
export async function getLastMonthPopularMontrealEvents(limit = 4): Promise<EventCard[] | null> {
  try {
    const db = await getDb();
    if (!db) return null;

    const { year, month } = montrealYearMonth(new Date());
    const startThisMonth = new Date(Date.UTC(year, month, 1));
    const startLastMonth = new Date(Date.UTC(year, month - 1, 1)); // month -1 rolls Jan → prev Dec

    const rows = await db
      .collection("event_master")
      .aggregate([
        {
          $match: {
            start_date: { $gte: startLastMonth, $lt: startThisMonth },
            eventVisibility: "public",
            // NB: no \b word boundaries — see getUpcomingMontrealEvents.
            localisation: { $regex: "(Montreal|Montréal|Canada)", $options: "i" },
            deletedAt: null,
            image: { $nin: [null, ""] },
          },
        },
        {
          // Popularity = count of distinct users who engaged with the Event
          // (dislikes excluded), mirroring the club_like_master member count.
          $lookup: {
            from: "event_like_master",
            let: { eid: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$event", "$$eid"] }, status: { $ne: "dislike" } } },
              { $group: { _id: null, users: { $addToSet: "$user" } } },
            ],
            as: "engagement",
          },
        },
        {
          $addFields: {
            popularity: { $size: { $ifNull: [{ $arrayElemAt: ["$engagement.users", 0] }, []] } },
          },
        },
        { $sort: { popularity: -1, start_date: -1 } },
        { $limit: 20 },
        { $project: { _id: 0, title: 1, start_date: 1, localisation: 1, frTheme: 1, image: 1 } },
      ])
      .toArray();

    const events = toEventCards(rows, limit);
    return events.length >= 4 ? events : null;
  } catch {
    return null;
  }
}
