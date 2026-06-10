import { brandOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { locales } from "@/lib/i18n";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "bubbleOut | Events spontanés et Clubs locaux à Montréal et Paris";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OgImage() {
  return brandOgImage(
    "Trouve tes humains à travers ce que tu aimes faire.",
    "Events spontanés · Clubs qui durent · Montréal & Paris",
  );
}
