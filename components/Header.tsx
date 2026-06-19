import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { DOWNLOAD_LINK } from "@/lib/constants";
import { LangSwitch } from "@/components/LangSwitch";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.header;
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${locale}`} aria-label="bubbleOut — accueil" className="flex items-center gap-2">
          <Image src="/assets/logo/wordmark.svg" alt="bubbleOut" width={120} height={28} priority className="h-7 w-auto" />
        </Link>

        <nav aria-label={h.citySwitchLabel} className="hidden items-center gap-1 text-sm sm:flex">
          <Link
            href={`/${locale}/montreal`}
            className="rounded-cta px-3 py-1.5 transition-colors hover:bg-blue-light/30"
          >
            {h.cities.montreal}
          </Link>
          <span aria-hidden="true" className="text-ink/30">
            |
          </span>
          <Link
            href={`/${locale}/paris`}
            className="rounded-cta px-3 py-1.5 transition-colors hover:bg-blue-light/30"
          >
            {h.cities.paris}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={`/${locale}/a-propos`} className="hidden text-sm hover:underline md:block">
            {h.about}
          </Link>
          <LangSwitch locale={locale} label={h.langSwitchLabel} />
          <a
            href={DOWNLOAD_LINK}
            aria-label={h.ctaLabel}
            className="rounded-cta bg-blue px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {h.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
