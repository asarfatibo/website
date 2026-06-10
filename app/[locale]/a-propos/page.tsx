import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { DOWNLOAD_LINK } from "@/lib/constants";
import { StoreBadges } from "@/components/StoreBadges";
import { DownloadButton } from "@/components/ui";
import { ACCENTS, accentBg } from "@/lib/theme";

/*
  À propos / Mission — copy source (validated):
  marketing/website/copy/2026-06-10-a-propos.md
  Light page: brand SEO + credibility. One soft CTA at the end.
  The team speaks « on / nous » here (only page where that is allowed).
*/

const HERO_PHOTOS = [
  "/assets/pictures/painting-group.avif",
  "/assets/pictures/sport-team.avif",
  "/assets/pictures/echec-game-team.avif",
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
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: {
      canonical: `/${locale}/a-propos`,
      languages: { fr: "/fr/a-propos", en: "/en/a-propos", "x-default": "/fr/a-propos" },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/a-propos`,
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = dict.about;

  return (
    <>
      {/* S1 — Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 md:pt-20">
        <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">{page.h1}</h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl">{page.heroSubline}</p>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {HERO_PHOTOS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={400}
              height={280}
              priority={i === 0}
              className={`h-40 w-full rounded-card object-cover md:h-56 ${i === 1 ? "md:translate-y-6" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* S2 — La mission */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl">{page.missionTitle}</h2>
        <p className="mt-8 max-w-3xl font-display text-3xl leading-snug text-blue md:text-4xl">
          « {page.missionStatement} »
        </p>
        <div className="mt-8 max-w-3xl space-y-5 text-lg text-ink/80">
          {page.missionBody.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* S3 — Les quatre valeurs */}
      <section className="bg-white/50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{page.valuesTitle}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {page.values.map((value, i) => (
              <li key={value.title} className={`rounded-card p-6 md:p-8 ${accentBg[ACCENTS[i % 4]]}`}>
                <h3 className="text-2xl">{value.title}</h3>
                <p className="mt-3 text-ink/80">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* S4 — L'histoire */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl">{page.storyTitle}</h2>
        <div className="mt-8 max-w-3xl space-y-5 text-lg text-ink/80">
          {page.storyBody.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
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
            <Link href={`/${locale}/montreal`} className="text-white/80 underline-offset-4 hover:underline">
              {dict.footer.cityLinks.montreal}
            </Link>
            <Link href={`/${locale}/paris`} className="text-white/80 underline-offset-4 hover:underline">
              {dict.footer.cityLinks.paris}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
