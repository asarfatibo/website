"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const target: Locale = locale === "fr" ? "en" : "fr";
  // Swap the leading /fr or /en for the target locale, keeping the rest of the path.
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  const href = `/${target}${rest}`;

  return (
    <Link
      href={href}
      aria-label={label}
      className="text-sm text-ink/60 hover:underline"
    >
      {locale === "fr" ? "EN" : "FR"}
    </Link>
  );
}
