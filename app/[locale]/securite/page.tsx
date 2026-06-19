import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { StoreBadges } from "@/components/StoreBadges";
import { DownloadButton } from "@/components/ui";
import { ACCENTS, accentBg } from "@/lib/theme";

const IMG = "/assets/pictures/securite";
const FEATURE_IMAGES = [
  `${IMG}/profil-certifie-biometrie.avif`,
  `${IMG}/localisation-exacte-secrete.avif`,
  `${IMG}/lutte-contenus-interdits.avif`,
  `${IMG}/bloquer-signaler.avif`,
] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = dict.security;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/securite`,
      languages: {
        fr: "/fr/securite",
        en: "/en/securite",
        "x-default": "/fr/securite",
      },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/securite`,
      title: page.metaTitle,
      description: page.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = dict.security;

  return (
    <>
      {/* S1 — Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 md:pt-20">
        <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">{page.h1}</h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl">{page.heroSubline}</p>
      </section>

      {/* S2 — 4 piliers de sécurité */}
      <section className="bg-white/50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{page.featuresTitle}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {page.features.map((feature, i) => (
              <li
                key={feature.title}
                className={`overflow-hidden rounded-card ${accentBg[ACCENTS[i % 4]]}`}
              >
                <Image
                  src={FEATURE_IMAGES[i]}
                  alt={feature.imgAlt}
                  width={600}
                  height={300}
                  className="h-44 w-full object-cover md:h-52"
                />
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl">{feature.title}</h3>
                  <p className="mt-3 text-ink/80">{feature.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* S3 — Conseils en ligne */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl">{page.onlineTipsTitle}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {page.onlineTips.map((tip) => (
            <li key={tip.title} className="rounded-card border border-ink/10 p-6">
              <h3 className="text-lg font-bold">{tip.title}</h3>
              <p className="mt-2 text-ink/70">{tip.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* S4 — Conseils en présentiel */}
      <section className="bg-white/50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{page.irlTipsTitle}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {page.irlTips.map((tip, i) => (
              <li key={tip.title} className={`rounded-card p-6 ${accentBg[ACCENTS[i % 4]]}`}>
                <h3 className="text-lg font-bold">{tip.title}</h3>
                <p className="mt-2 text-ink/70">{tip.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* S5 — CTA doux */}
      <section className="bg-blue">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-20">
          <h2 className="text-4xl text-white md:text-5xl">{dict.finalCta.title}</h2>
          <p className="mt-4 text-lg text-white/90">{page.ctaSubline}</p>
          <div className="mt-8 flex flex-col items-center gap-5">
            <DownloadButton label={dict.finalCta.cta} light />
            <StoreBadges dict={dict} />
            <p className="text-sm text-white/80">{dict.finalCta.microcopy}</p>
          </div>
          <p className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link
              href={`/${locale}/montreal`}
              className="text-white/80 underline-offset-4 hover:underline"
            >
              {dict.footer.cityLinks.montreal}
            </Link>
            <Link
              href={`/${locale}/paris`}
              className="text-white/80 underline-offset-4 hover:underline"
            >
              {dict.footer.cityLinks.paris}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
