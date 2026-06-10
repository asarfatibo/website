import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { cities, locales } from "@/lib/i18n";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "bubbleOut | Events et Clubs locaux près de chez toi";

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city })));
}

const CITY_OG: Record<string, { title: string; subtitle: string }> = {
  montreal: {
    title: "Sortir et trouver tes humains à Montréal.",
    subtitle: "Events spontanés · Clubs qui durent · du Plateau au Village",
  },
  paris: {
    title: "bubbleOut arrive à Paris.",
    subtitle: "Fonde ton Club · Sois dans les premiers",
  },
};

export default async function OgImage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const { title, subtitle } = CITY_OG[city] ?? CITY_OG.montreal;
  return brandOgImage(title, subtitle);
}
