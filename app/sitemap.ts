import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/montreal", priority: 0.9, changeFrequency: "daily" },
  { path: "/paris", priority: 0.9, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}/fr${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr${path}`,
        en: `${SITE_URL}/en${path}`,
        "x-default": `${SITE_URL}/fr${path}`,
      },
    },
  }));
}
