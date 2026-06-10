import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LIVE_STATS, SHOWCASE_CLUBS, SITE_URL, STORE_LINKS } from "@/lib/constants";
import { StoreBadges } from "@/components/StoreBadges";

const ACCENTS = ["blue", "green", "purple", "pink"] as const;

const accentBg: Record<(typeof ACCENTS)[number], string> = {
  blue: "bg-blue-light/30",
  green: "bg-green-light/30",
  purple: "bg-purple-light/30",
  pink: "bg-pink-light/40",
};

const accentBar: Record<(typeof ACCENTS)[number], string> = {
  blue: "bg-blue",
  green: "bg-green",
  purple: "bg-purple",
  pink: "bg-pink",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "bubbleOut",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.svg`,
        sameAs: [STORE_LINKS.appStore, STORE_LINKS.googlePlay],
      },
      {
        "@type": "MobileApplication",
        name: "bubbleOut",
        operatingSystem: "iOS, Android",
        applicationCategory: "SocialNetworkingApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        installUrl: STORE_LINKS.appStore,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* S2 — Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl">{dict.hero.h1}</h1>
          <p className="mt-6 text-lg md:text-xl">{dict.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={STORE_LINKS.appStore}
              className="rounded-cta bg-blue px-8 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              {dict.hero.cta}
            </a>
            <StoreBadges dict={dict} />
          </div>
          <p className="mt-4 text-sm text-ink/60">{dict.hero.reassurance}</p>
        </div>
        {/* TODO étape 2 (polish) : mockup téléphone — screenshot du feed réel */}
      </section>

      {/* S3 — Preuve sociale */}
      <section className="border-y border-ink/10 bg-white/40">
        <h2 className="sr-only">{dict.proof.srTitle}</h2>
        <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-center sm:grid-cols-3">
          <div>
            <dt className="font-display text-4xl">{LIVE_STATS.usersTotal}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.users}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl">{LIVE_STATS.events30d}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.events}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl">{LIVE_STATS.rating}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.rating}</dd>
          </div>
        </dl>
      </section>

      {/* S4 — Module ville active — TODO étape 4 : module live Events (ISR) + switch ville.
          En attendant : variante Montréal en fallback statique, sans cartes. */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl">{dict.cityModule.montreal.title}</h2>
        <p className="mt-3 text-lg text-ink/70">{dict.cityModule.montreal.subtitle}</p>
        <div className="mt-8 rounded-card border border-dashed border-ink/20 p-10 text-center text-ink/50">
          {/* Placeholder grille Events — branchée à l'étape 4 (API/ISR ou JSON curaté) */}
          Grille d&apos;Events à venir — module live, étape 4
        </div>
        <div className="mt-8">
          <a
            href={STORE_LINKS.appStore}
            className="rounded-cta bg-blue px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            {dict.cityModule.montreal.cta}
          </a>
        </div>
      </section>

      {/* S5 — Comment ça marche */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl">{dict.how.title}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {dict.how.steps.map((step, i) => (
            <li key={step.title} className="rounded-card bg-white/60 p-6">
              <div className={`h-1.5 w-12 rounded-full ${accentBar[ACCENTS[i % 4]]}`} aria-hidden="true" />
              <h3 className="mt-4 text-xl">{step.title}</h3>
              <p className="mt-2 text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* S6 — Des Clubs qui durent */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl">{dict.clubs.title}</h2>
        <p className="mt-3 max-w-2xl text-lg">{dict.clubs.intro}</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE_CLUBS.map((club) => (
            <li key={club.name} className={`rounded-card p-6 ${accentBg[club.themeColor]}`}>
              <h3 className="text-lg leading-snug">{club.name}</h3>
              <p className="mt-1 text-sm text-ink/60">
                {club.theme} · {club.members} {dict.clubs.membersSuffix}
              </p>
              <p className="mt-3 text-sm italic text-ink/80">{club.line}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href={STORE_LINKS.appStore}
            className="rounded-cta bg-blue px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            {dict.clubs.cta}
          </a>
        </div>
      </section>

      {/* S7 — Reconnais-toi */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl">{dict.personas.title}</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {dict.personas.cards.map((card, i) => (
            <li key={card.title} className={`rounded-card p-8 ${accentBg[ACCENTS[i % 4]]}`}>
              <h3 className="text-2xl">{card.title}</h3>
              <p className="mt-3 text-ink/80">{card.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* S8 — Réassurance */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="max-w-3xl text-3xl md:text-4xl">{dict.trust.title}</h2>
        <ul className="mt-8 max-w-2xl space-y-4">
          {dict.trust.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green" />
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* S9 — CTA final */}
      <section className="bg-blue">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-4xl text-white md:text-5xl">{dict.finalCta.title}</h2>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={STORE_LINKS.appStore}
              className="rounded-cta bg-white px-8 py-4 text-lg font-bold text-blue transition-opacity hover:opacity-90"
            >
              {dict.finalCta.cta}
            </a>
            <StoreBadges dict={dict} variant="dark" />
            <p className="text-sm text-white/80">{dict.finalCta.microcopy}</p>
          </div>
        </div>
      </section>
    </>
  );
}
