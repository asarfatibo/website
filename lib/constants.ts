/*
  Links source: links_to_use.md.txt (provided 2026-06-10).
  DOWNLOAD_LINK is the Branch.io smart deeplink — routes to the right store
  automatically. Use it for EVERY download CTA; the per-store URLs only feed
  the official badges and JSON-LD.
*/
export const DOWNLOAD_LINK = "https://bubbleout.app.link/O3nEWHvv7Sb";

export const STORE_LINKS = {
  appStore: "https://apps.apple.com/fr/app/bubbleout-sortir-et-se-revoir/id6741350091",
  googlePlay: "https://play.google.com/store/apps/details?id=com.bubbleout.social",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/bubbleout.mtl",
  instagramHandle: "@bubbleout.mtl",
  tiktok: "https://www.tiktok.com/@bubbleout.app",
} as const;

export const SITE_URL = "https://bubbleout.fr";

/*
  Social proof figures — maintained by `npm run data:refresh`
  (scripts/refresh-data.mjs, read-only Mongo, data-fetcher method). Rule: a
  failing refresh keeps the committed snapshot, never estimates.
  usersDisplay: union of active Montréal + Paris users, floored to the
  nearest 50 with a "+" — display rounding requested by Alban 2026-06-10,
  always rounded DOWN.
*/
import liveData from "./live-data.json";

export const LIVE_STATS = liveData.stats;
export const LIVE_DATA_DATE = liveData.generatedAt;

const CLUB_MEMBERS: Record<string, number> = liveData.clubMembers;

/*
  Paris launch toggle — drives the [PRÉ-LANCEMENT] vs [JOUR J] wording on
  /paris (copy doc: marketing/website/copy/2026-06-10-paris.md). Flip to true
  on launch day.
*/
export const PARIS_LAUNCHED = false;

/*
  App Store rating + reviews — fetched 2026-06-10 from the live App Store
  page (fr). Reviews are VERBATIM user quotes, never edited, displayed with
  pseudonym and source. Selection rule: reviews using dating-adjacent
  vocabulary are not displayed (we never rewrite a user's words).
*/
export const APP_RATING = {
  score: "5 / 5",
  count: 10,
  source: "App Store",
} as const;

export const REVIEWS = [
  {
    title: "Top app !",
    text: "Exactement ce qu'il me fallait. Ça fait plaisir de rencontrer des gens sans prise de tête 👌🏻",
    author: "Thonksi",
    stars: 5,
  },
  {
    title: "Merci pour cette appli!!",
    text: "Meilleure appli sur le marché pour organiser des restos/sorties entre potes",
    author: "mskh19",
    stars: 5,
  },
  {
    title: "Intéressant",
    text: "J'ai pu faire de belles rencontres",
    author: "LucasMTL.",
    stars: 5,
  },
] as const;

/*
  Curated past Events — static fallback of the live city module, used when
  the DB is unreachable or fewer than 4 showable upcoming Events exist.
  Titles VERBATIM from organizers (live-data.md, curated entities May 2026).
  Covers are the real event images downloaded from api.bubbleout.fr.
*/
export const CURATED_EVENTS: readonly import("./events").EventCard[] = [
  {
    title: "Pique Nique Parc Fontaine",
    date: "24 mai",
    place: "Parc La Fontaine",
    theme: "Foodie",
    themeColor: "green",
    image: "/events/pique-nique-parc-fontaine.jpg",
  },
  {
    title: "Tournoi de beer-pong",
    date: "9 mai",
    place: "Union Française de Montréal",
    theme: "Vie nocturne",
    themeColor: "purple",
    image: "/events/tournoi-beer-pong.jpg",
  },
  {
    title: "Journaling de fin de mois 🌞💛",
    date: "29 mai",
    place: "Les Alchimistes Café",
    theme: "Bien-être",
    themeColor: "pink",
    image: "/events/journaling-fin-de-mois.jpg",
  },
  {
    title: "🎤 🎙️ VOIX LIBRE MTL 🔥",
    date: "2 mai",
    place: "Parc La Fontaine",
    theme: "Musique",
    themeColor: "blue",
    image: "/events/voix-libre-mtl.jpg",
  },
] as const;

/*
  Showcase Clubs — names and descriptions are organizer verbatim (cuts marked
  in marketing/website/copy/2026-06-10-home.md). Member counts come from
  live-data.json (refreshed by `npm run data:refresh`), with the committed
  snapshot value as fallback. Covers are the real club images from
  api.bubbleout.fr (club_img/). Selection validated at the prioritization
  gate; admins to be notified before go-live.
*/
const SHOWCASE_CLUBS_BASE = [
  {
    name: "Time to apéritz",
    theme: "Apéritif",
    themeColor: "pink",
    members: 49,
    line: "« Fini les 5 à 7 corpo, maintenant on veut que des apéro au soleil ☀️ »",
    image: "/clubs/time-to-aperitz.jpg",
  },
  {
    name: "MTL Sound Club 🪩",
    theme: "Musique",
    themeColor: "purple",
    members: 38,
    line: "« Un groupe pour celles et ceux qui aiment les soirées où y'a du bon son, une bonne énergie »",
    image: "/clubs/mtl-sound-club.jpg",
  },
  {
    name: "Club Run MTL",
    theme: "Sport",
    themeColor: "green",
    members: 33,
    line: "« On court, on court et on discute »",
    image: "/clubs/club-run-mtl.jpg",
  },
  {
    name: "Le club des loups-garous ( Jeu 🐺 )",
    theme: "Jeux",
    themeColor: "blue",
    members: 29,
    line: "« un groupe actif depuis déjà 3 ans pour jouer au loup garou »",
    image: "/clubs/loups-garous.jpg",
  },
] as const;

export const SHOWCASE_CLUBS = SHOWCASE_CLUBS_BASE.map((club) => ({
  ...club,
  members: CLUB_MEMBERS[club.name] ?? club.members,
}));
