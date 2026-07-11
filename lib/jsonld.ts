import { APP_RATING, DOWNLOAD_LINK, SITE_URL, SOCIAL_LINKS, STORE_LINKS } from "@/lib/constants";
import type { EventCard } from "@/lib/events";
import type { Locale } from "@/lib/i18n";

/*
  Définition canonique bubbleOut — validée par Alban 2026-07-11 (plan GEO,
  marketing/seo/2026-07-11-seo-geo-plan.md). Reprise à l'identique partout :
  JSON-LD, FAQ, llms.txt, descriptions stores, bio Instagram, Wikidata.
  « Communautés » (mot de requête grand public), pas « Clubs » (nom de feature).
*/
export const CANONICAL_DEFINITION: Record<Locale, string> = {
  fr: "bubbleOut est une app gratuite pour rejoindre des Communautés et des Events près de chez toi, à Montréal et à Paris. Pas de swipe, pas de dating : des humains, des sorties, une communauté qui dure.",
  en: "bubbleOut is a free app for joining local Communities and Events in Montreal and Paris. No swiping, no dating: real people, real outings, a community that lasts.",
};

const KNOWS_ABOUT: Record<Locale, string[]> = {
  fr: ["communautés locales", "Events et sorties", "vie sociale à Montréal", "vie sociale à Paris"],
  en: ["local communities", "local events and outings", "social life in Montreal", "social life in Paris"],
};

// Organization + MobileApplication graph, shared by the home and city pages.
// aggregateRating mirrors APP_RATING (real App Store figures, never estimated).
export function orgAndAppJsonLd(locale: Locale) {
  const description = CANONICAL_DEFINITION[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "bubbleOut",
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo/logo.svg`,
        description,
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "City", name: "Paris" },
        ],
        knowsAbout: KNOWS_ABOUT[locale],
        sameAs: [
          STORE_LINKS.appStore,
          STORE_LINKS.googlePlay,
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.tiktok,
          // Entité Wikidata créée le 2026-07-11 (plan GEO, fiches externes)
          "https://www.wikidata.org/wiki/Q140509972",
        ],
      },
      {
        "@type": "MobileApplication",
        name: "bubbleOut",
        description,
        operatingSystem: "iOS, Android",
        applicationCategory: "SocialNetworkingApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: parseFloat(APP_RATING.score),
          bestRating: 5,
          ratingCount: APP_RATING.count,
        },
        installUrl: DOWNLOAD_LINK,
      },
    ],
  };
}

// ItemList of the Events shown in a grid. All grids are Montréal-scoped today
// (curation rule in lib/events.ts); revisit addressLocality when Paris grids land.
export function eventsItemListJsonLd(events: readonly EventCard[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.title,
        ...(event.startDateIso ? { startDate: event.startDateIso } : {}),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.place,
          address: { "@type": "PostalAddress", addressLocality: "Montréal", addressCountry: "CA" },
        },
        image: event.image.startsWith("/") ? `${SITE_URL}${event.image}` : event.image,
      },
    })),
  };
}
