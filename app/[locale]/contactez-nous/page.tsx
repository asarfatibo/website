import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { LegalLayout } from "@/components/LegalLayout";
import { ContactForm } from "./ContactForm";

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
  const c = dict.contact;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${locale}/contactez-nous`,
      languages: {
        fr: "/fr/contactez-nous",
        en: "/en/contactez-nous",
        "x-default": "/fr/contactez-nous",
      },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/contactez-nous`,
      title: c.metaTitle,
      description: c.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
    },
  };
}

export default async function ContactezNousPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const c = dict.contact;

  return (
    <LegalLayout>
      <h1 className="mb-4 text-3xl font-extrabold text-ink">{c.h1}</h1>
      <p className="text-ink/70">
        {c.introPre}
        <a
          href="mailto:hello@bubbleout.fr"
          className="text-blue underline hover:opacity-80"
        >
          hello@bubbleout.fr
        </a>
        .
      </p>
      <ContactForm t={c.form} />
    </LegalLayout>
  );
}
