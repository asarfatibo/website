import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

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
  const faq = dict.faq;
  return {
    title: faq.metaTitle,
    description: faq.metaDescription,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        fr: "/fr/faq",
        en: "/en/faq",
        "x-default": "/fr/faq",
      },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/faq`,
      title: faq.metaTitle,
      description: faq.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: faq.metaTitle,
      description: faq.metaDescription,
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const faq = dict.faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.categories
      .flatMap((cat) => cat.items)
      .map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-extrabold text-ink">{faq.h1}</h1>
        <p className="mt-3 text-lg text-ink/60">{faq.intro}</p>

        <div className="mt-12 space-y-12">
          {faq.categories.map((cat) => (
            <section key={cat.category}>
              <h2 className="mb-4 text-xl font-bold text-ink">{cat.category}</h2>
              <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60 px-6">
                {cat.items.map(({ q, a }) => (
                  <details key={q} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-base font-semibold text-ink hover:text-blue">
                      <span>{q}</span>
                      <span className="mt-0.5 shrink-0 text-xl font-light text-ink/40 transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-sm leading-relaxed text-ink/70">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-blue/5 px-8 py-10 text-center">
          <h2 className="text-xl font-bold text-ink">{faq.ctaTitle}</h2>
          <p className="mt-2 text-ink/60">{faq.ctaBody}</p>
          <a
            href={`/${locale}/contactez-nous`}
            className="mt-6 inline-block rounded-cta bg-blue px-8 py-3 font-bold text-white transition-transform hover:scale-[1.02]"
          >
            {faq.ctaButton}
          </a>
        </div>
      </article>
    </>
  );
}
