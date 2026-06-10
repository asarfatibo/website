import type { Dictionary } from "@/lib/i18n";
import { STORE_LINKS } from "@/lib/constants";

/*
  Text-link store badges for now — replaced by the official Apple/Google
  badge images (with proper alt text from the dictionary) during the visual
  polish pass. Official badges must be downloaded from Apple/Google brand
  pages, never redrawn.
*/
export function StoreBadges({
  dict,
  variant = "light",
}: {
  dict: Dictionary;
  variant?: "light" | "dark";
}) {
  const cls =
    variant === "dark"
      ? "rounded-cta border border-white/60 px-4 py-2 text-sm text-white hover:bg-white/10"
      : "rounded-cta border border-ink/30 px-4 py-2 text-sm hover:bg-ink/5";
  return (
    <div className="flex gap-3">
      <a href={STORE_LINKS.appStore} aria-label={dict.hero.appStoreAlt} className={cls}>
        App Store
      </a>
      <a href={STORE_LINKS.googlePlay} aria-label={dict.hero.googlePlayAlt} className={cls}>
        Google Play
      </a>
    </div>
  );
}
