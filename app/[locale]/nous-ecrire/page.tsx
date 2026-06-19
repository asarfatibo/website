import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";
import { FeedbackForm } from "./FeedbackForm";

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
  const f = dict.feedback;
  return {
    title: f.metaTitle,
    description: f.metaDescription,
    alternates: {
      canonical: `/${locale}/nous-ecrire`,
      languages: {
        fr: "/fr/nous-ecrire",
        en: "/en/nous-ecrire",
        "x-default": "/fr/nous-ecrire",
      },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/nous-ecrire`,
      title: f.metaTitle,
      description: f.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: f.metaTitle,
      description: f.metaDescription,
    },
  };
}

export default async function NousEcrirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const f = dict.feedback;

  return (
    <LegalLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-ink">{f.h1}</h1>
      <p className="text-ink/70">
        {f.introPre}
        <a
          href="mailto:hello@bubbleout.fr"
          className="text-blue underline hover:opacity-80"
        >
          hello@bubbleout.fr
        </a>
        .
      </p>
      <FeedbackForm t={f.form} />
    </LegalLayout>
  );
}
