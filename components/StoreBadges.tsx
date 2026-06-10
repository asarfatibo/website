import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { STORE_LINKS } from "@/lib/constants";

// Official store badges (SVG assets provided in public/assets/badges-stores).
export function StoreBadges({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex items-center gap-3">
      <a href={STORE_LINKS.appStore} aria-label={dict.hero.appStoreAlt}>
        <Image
          src="/assets/badges-stores/appstore.svg"
          alt={dict.hero.appStoreAlt}
          width={135}
          height={40}
          className="h-10 w-auto"
        />
      </a>
      <a href={STORE_LINKS.googlePlay} aria-label={dict.hero.googlePlayAlt}>
        <Image
          src="/assets/badges-stores/googleplay.svg"
          alt={dict.hero.googlePlayAlt}
          width={135}
          height={40}
          className="h-10 w-auto"
        />
      </a>
    </div>
  );
}
