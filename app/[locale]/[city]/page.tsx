import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, isCity, isLocale, locales } from "@/lib/i18n";

/*
  City landing pages — étape 3 of the production plan.
  Full FR copy is validated and waiting in:
  - marketing/website/copy/2026-06-10-montreal.md
  - marketing/website/copy/2026-06-10-paris.md
  This stub only reserves the routes so internal links resolve.
*/

const CITY_META: Record<string, { title: string; description: string; h1: string }> = {
  montreal: {
    title: "bubbleOut Montréal | Events, Clubs et sorties près de toi",
    description:
      "Sortir à Montréal et rencontrer du monde autour de ce que tu aimes : Events spontanés, Clubs qui durent, du Plateau au Village. Gratuit, profil vérifié.",
    h1: "Sortir et trouver tes humains à Montréal.",
  },
  paris: {
    title: "bubbleOut Paris | fonde ton Club, sois dans les premiers",
    description:
      "bubbleOut arrive à Paris. Fonde un des premiers Clubs de ta ville, propose des sorties et fais-toi des amis autour de ce que tu aimes faire. Profil vérifié.",
    h1: "bubbleOut arrive à Paris : les premiers Clubs se créent maintenant.",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale) || !isCity(city)) notFound();
  const meta = CITY_META[city];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/${city}`,
      languages: { fr: `/fr/${city}`, en: `/en/${city}`, "x-default": `/fr/${city}` },
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  if (!isLocale(locale) || !isCity(city)) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-24">
      <h1 className="max-w-3xl text-4xl md:text-6xl">{CITY_META[city].h1}</h1>
      {/* TODO étape 3 : page complète depuis la copie validée */}
    </section>
  );
}
