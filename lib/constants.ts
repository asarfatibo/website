/*
  Links source: links_to_use.md.txt (provided 2026-06-10).
  DOWNLOAD_LINK is the Branch.io smart deeplink — routes to the right store
  automatically. Use it for EVERY download CTA; the per-store URLs only feed
  the official badges and JSON-LD.
*/
export const DOWNLOAD_LINK = "https://bubbleout.app.link";

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
  Curated past Events — static fallback of the city module until the live
  API wiring (étape 4). Titles VERBATIM from organizers (live-data.md,
  curated entities May 2026). Covers are the real event images downloaded
  from api.bubbleout.fr.
*/
export const CURATED_EVENTS = [
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
  in marketing/website/copy/2026-06-10-home.md), member counts from snapshot.
  Covers are the real club images from api.bubbleout.fr (club_img/), same
  convention as event covers. Selection validated at the prioritization gate;
  admins to be notified before go-live.
*/
export const SHOWCASE_CLUBS = [
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
