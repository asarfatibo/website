import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href={`/${locale}/a-propos`} className="hover:underline">
            {f.about}
          </Link>
          <Link href={`/${locale}/politique-de-confidentialite`} className="hover:underline">
            {f.privacy}
          </Link>
          <Link href={`/${locale}/conditions-d-utilisations`} className="hover:underline">
            {f.terms}
          </Link>
          <Link href={`/${locale}/contactez-nous`} className="hover:underline">
            {f.contact}
          </Link>
          <Link href={`/${locale}/securite`} className="hover:underline">
            {f.security}
          </Link>
          <Link href={`/${locale}/faq`} className="hover:underline">
            FAQ
          </Link>
          <a href={SOCIAL_LINKS.instagram} aria-label={f.instagramLabel} className="hover:underline">
            Instagram
          </a>
          <a href={SOCIAL_LINKS.tiktok} aria-label={f.tiktokLabel} className="hover:underline">
            TikTok
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/60">
          <Link href={`/${locale}/montreal`} className="hover:underline">
            {f.cityLinks.montreal}
          </Link>
          <Link href={`/${locale}/paris`} className="hover:underline">
            {f.cityLinks.paris}
          </Link>
        </div>
        <p className="mt-8 text-sm text-ink/60">{f.baseline}</p>
      </div>
    </footer>
  );
}
