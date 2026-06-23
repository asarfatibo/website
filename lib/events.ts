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

    // Fewer than 4 showable upcoming Events reads as an empty app — use the
    // curated fallback instead (spec rule).
    return events.length >= 4 ? events : null;
  } catch {
    return null;
  }
}
