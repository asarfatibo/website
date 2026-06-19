import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly"; frOnly?: boolean }> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/montreal", priority: 0.9, changeFrequency: "daily" },
  { path: "/paris", priority: 0.9, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.4, changeFrequency: "monthly" },
  { path: "/securite", priority: 0.4, changeFrequency: "monthly" },
  { path: "/conditions-d-utilisations", priority: 0.3, changeFrequency: "monthly", frOnly: true },
  { path: "/politique-de-confidentialite", priority: 0.3, changeFrequency: "monthly", frOnly: true },
  { path: "/liste-des-destinataires-de-donnees", priority: 0.2, changeFrequency: "monthly", frOnly: true },
  { path: "/protection-des-mineurs", priority: 0.3, changeFrequency: "monthly", frOnly: true },
  { path: "/contactez-nous", priority: 0.4, changeFrequency: "monthly" },
  { path: "/nous-ecrire", priority: 0.4, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency, frOnly }) => ({
    url: `${SITE_URL}/fr${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: frOnly
        ? {
            fr: `${SITE_URL}/fr${path}`,
            "x-default": `${SITE_URL}/fr${path}`,
          }
        : {
            fr: `${SITE_URL}/fr${path}`,
            en: `${SITE_URL}/en${path}`,
            "x-default": `${SITE_URL}/fr${path}`,
          },
    },
  }));
}
