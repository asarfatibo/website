export const STORE_LINKS = {
  appStore: "https://apps.apple.com/fr/app/bubbleout-rencontres-irl/id6741350091",
  googlePlay: "https://play.google.com/store/apps/details?id=com.bubbleout.social",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/bubbleout.app/",
  tiktok: "https://www.tiktok.com/@bubbleout.app",
} as const;

export const SITE_URL = "https://bubbleout.fr";

/*
  Social proof figures — resolved at build time from the live-data pipeline
  (marketing/_context/live-data.md, snapshot 2026-05-30). Rule: a missing
  metric is OMITTED from the page, never estimated. Refresh weekly.
*/
export const LIVE_STATS = {
  usersTotal: 1935,
  events30d: 42,
  rating: "4,2 / 5",
  snapshotDate: "2026-05-30",
} as const;

/*
  Showcase Clubs — names and descriptions are organizer verbatim (cuts marked
  in marketing/website/copy/2026-06-10-home.md), member counts from snapshot.
  Selection validated at the prioritization gate; admins to be notified before
  go-live.
*/
export const SHOWCASE_CLUBS = [
  {
    name: "Time to apéritz",
    theme: "Apéritif",
    themeColor: "pink",
    members: 49,
    line: "« Fini les 5 à 7 corpo, maintenant on veut que des apéro au soleil ☀️ »",
  },
  {
    name: "MTL Sound Club 🪩",
    theme: "Musique",
    themeColor: "purple",
    members: 38,
    line: "« Un groupe pour celles et ceux qui aiment les soirées où y'a du bon son, une bonne énergie »",
  },
  {
    name: "Club Run MTL",
    theme: "Sport",
    themeColor: "green",
    members: 33,
    line: "« On court, on court et on discute »",
  },
  {
    name: "Le club des loups-garous ( Jeu 🐺 )",
    theme: "Jeux",
    themeColor: "blue",
    members: 29,
    line: "« un groupe actif depuis déjà 3 ans pour jouer au loup garou »",
  },
] as const;
