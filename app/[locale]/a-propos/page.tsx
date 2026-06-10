import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";

// Stub — page Mission légère (brief §4, P0 mais après la home).
// La copie sera produite par l'agent website-writer.

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-24">
      <h1 className="max-w-3xl text-4xl md:text-6xl">
        {locale === "fr" ? "Sortir de sa bulle, ensemble." : "Getting out of the bubble, together."}
      </h1>
      {/* TODO : copie complète via website-writer */}
    </section>
  );
}
