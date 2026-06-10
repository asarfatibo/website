import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cities, getDictionary, isCity, isLocale, locales } from "@/lib/i18n";
import {
  CURATED_EVENTS,
  DOWNLOAD_LINK,
  LIVE_STATS,
  PARIS_LAUNCHED,
  SHOWCASE_CLUBS,
  SITE_URL,
  SOCIAL_LINKS,
  STORE_LINKS,
} from "@/lib/constants";
import { StoreBadges } from "@/components/StoreBadges";
import { DownloadButton } from "@/components/ui";
import { EventsGrid } from "@/components/EventsGrid";
import { getUpcomingMontrealEvents, type EventCard } from "@/lib/events";
import { ACCENTS, accentBar, accentBg, accentTag, type Accent } from "@/lib/theme";

// ISR: the Montréal Events grid refreshes every hour without a rebuild.
export const revalidate = 3600;

/*
  City landing pages — étape 3. Copy source (validated):
  - marketing/website/copy/2026-06-10-montreal.md  (proof framing)
  - marketing/website/copy/2026-06-10-paris.md     (pioneer framing, launch toggle)
*/

// Montréal: cut chosen for its geo anchor — different from the home cut, still verbatim.
const LOUPS_GAROUS_MTL_LINE =
  "« Nous nous réunissons les dimanches après-midi au Parc La Fontaine quand il fait beau »";

const MTL_HOW_SCREENS = [
  "/assets/mockup-app/french/event.png",
  "/assets/mockup-app/french/propose_hangout.png",
  "/assets/mockup-app/french/chat.png",
] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale) || !isCity(city)) notFound();
  const dict = await getDictionary(locale);
  const page = dict.cityPages[city];
  const description =
    city === "paris"
      ? PARIS_LAUNCHED
        ? dict.cityPages.paris.metaDescriptionLive
        : dict.cityPages.paris.metaDescriptionPre
      : dict.cityPages.montreal.metaDescription;
  return {
    title: page.metaTitle,
    description,
    alternates: {
      canonical: `/${locale}/${city}`,
      languages: { fr: `/fr/${city}`, en: `/en/${city}`, "x-default": `/fr/${city}` },
    },
  };
}

function CityJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "bubbleOut",
        url: SITE_URL,
        logo: `${SITE_URL}/assets/logo/logo.svg`,
        sameAs: [STORE_LINKS.appStore, STORE_LINKS.googlePlay, SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok],
      },
      {
        "@type": "MobileApplication",
        name: "bubbleOut",
        operatingSystem: "iOS, Android",
        applicationCategory: "SocialNetworkingApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        installUrl: DOWNLOAD_LINK,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city } = await params;
  if (!isLocale(locale) || !isCity(city)) notFound();
  const dict = await getDictionary(locale);

  if (city === "montreal") {
    const liveEvents = await getUpcomingMontrealEvents();
    return <MontrealPage dict={dict} liveEvents={liveEvents} />;
  }
  return <ParisPage dict={dict} />;
}

type Dict = Awaited<ReturnType<typeof getDictionary>>;

/* ─── /montreal — proof framing ─── */

function MontrealPage({ dict, liveEvents }: { dict: Dict; liveEvents: EventCard[] | null }) {
  const page = dict.cityPages.montreal;
  const events = liveEvents ?? CURATED_EVENTS;
  const isLive = liveEvents !== null;
  return (
    <>
      <CityJsonLd />

      {/* Hero géo-ancré */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
          <div>
            <h1 className="text-4xl leading-tight md:text-6xl">{page.h1}</h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl">
              {page.heroSubtitle.replace("{users}", String(LIVE_STATS.usersMontreal))}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton label={dict.hero.cta} />
              <StoreBadges dict={dict} />
            </div>
            <p className="mt-4 text-sm text-ink/60">{dict.hero.reassurance}</p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-x-6 top-8 bottom-0 rounded-card bg-green-light/40" aria-hidden="true" />
            <Image
              src="/assets/mockup-app/french/event.png"
              alt={page.heroMockupAlt}
              width={320}
              height={650}
              priority
              className="relative mx-auto h-auto w-64 rotate-2 drop-shadow-xl md:w-72"
            />
            <Image
              src="/assets/pictures/meeting-people-at-event.jpg"
              alt={page.heroPhotoAlt}
              width={224}
              height={150}
              priority
              className="absolute -left-2 bottom-6 hidden h-auto w-44 -rotate-3 rounded-2xl border-4 border-white object-cover shadow-lg md:block lg:w-56"
            />
          </div>
        </div>
      </section>

      {/* Preuve sociale 100 % Montréal */}
      <section className="border-y border-ink/10 bg-white/50">
        <h2 className="sr-only">{page.proofSrTitle}</h2>
        <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-center sm:grid-cols-3">
          <div>
            <dt className="font-display text-4xl md:text-5xl">{LIVE_STATS.usersMontreal}</dt>
            <dd className="mt-1 text-ink/70">{page.proofUsers}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl md:text-5xl">{LIVE_STATS.events30d}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.events}</dd>
          </div>
          <div>
            <dt className="font-display text-4xl md:text-5xl">{LIVE_STATS.rating}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.rating}</dd>
          </div>
        </dl>
      </section>

      {/* Events Montréal — live (ISR 1 h) avec fallback curaté */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">{isLive ? page.eventsLiveTitle : page.eventsTitle}</h2>
        <p className="mt-3 text-lg text-ink/70">{isLive ? page.eventsLiveSubtitle : page.eventsSubtitle}</p>
        <div className="mt-10">
          <EventsGrid events={events} />
        </div>
        <div className="mt-10">
          <DownloadButton label={page.eventsCta} />
        </div>
      </section>

      {/* Comment ça marche — version montréalaise */}
      <section className="bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{dict.how.title}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {page.howSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col">
                <div className={`mx-auto w-full max-w-56 rounded-card p-4 pb-0 ${accentBg[ACCENTS[i % 4]]}`}>
                  <Image
                    src={MTL_HOW_SCREENS[i]}
                    alt=""
                    width={280}
                    height={560}
                    className="mx-auto h-auto w-full rounded-t-2xl object-cover object-top"
                  />
                </div>
                <div className="mt-6 flex items-start gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-white ${accentBar[ACCENTS[i % 4]]}`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl">{step.title}</h3>
                    <p className="mt-2 text-ink/70">{step.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clubs MTL */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">{dict.clubs.title}</h2>
        <p className="mt-3 max-w-3xl text-lg">{page.clubsIntro}</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE_CLUBS.map((club) => (
            <li
              key={club.name}
              className={`overflow-hidden rounded-card transition-transform hover:-translate-y-1 ${accentBg[club.themeColor as Accent]}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={club.image}
                  alt={`Le Club ${club.name} sur bubbleOut`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 pt-4">
                <span className={`inline-block rounded-cta px-2.5 py-0.5 text-xs font-bold ${accentTag[club.themeColor as Accent]}`}>
                  {club.theme}
                </span>
                <h3 className="mt-3 text-lg leading-snug">{club.name}</h3>
                <p className="mt-1 text-sm text-ink/60">
                  {club.members} {dict.clubs.membersSuffix}
                </p>
                <p className="mt-3 text-sm italic text-ink/80">
                  {club.name.startsWith("Le club des loups-garous") ? LOUPS_GAROUS_MTL_LINE : club.line}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <DownloadButton label={dict.clubs.cta} />
        </div>
      </section>

      {/* Reconnais-toi — version MTL */}
      <section className="bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{dict.personas.title}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {page.personas.map((card, i) => (
              <li key={card.title} className={`rounded-card p-6 md:p-8 ${accentBg[ACCENTS[i % 4]]}`}>
                <h3 className="text-2xl">{card.title}</h3>
                <p className="mt-3 text-ink/80">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustSection dict={dict} />
      <FinalCta dict={dict} subtitle={page.finalSubtitle} />
    </>
  );
}

/* ─── /paris — pioneer framing, launch toggle ─── */

function ParisPage({ dict }: { dict: Dict }) {
  const page = dict.cityPages.paris;
  const h1 = PARIS_LAUNCHED ? page.h1Live : page.h1Pre;
  const subtitle = PARIS_LAUNCHED ? page.heroSubtitleLive : page.heroSubtitlePre;
  // Organisateur first (exigence spec) — reorder the shared persona cards.
  const personaOrder = [2, 0, 1, 3] as const;
  const personaAccents: Accent[] = ["purple", "blue", "green", "pink"];

  return (
    <>
      <CityJsonLd />

      {/* Hero pionnier */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
          <div>
            <h1 className="text-4xl leading-tight md:text-6xl">{h1}</h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl">{subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton label={page.ctaPrimary} />
              <StoreBadges dict={dict} />
            </div>
            <p className="mt-3 text-sm text-ink/60">{page.ctaMicrocopy}</p>
            <p className="mt-2 text-sm text-ink/60">{dict.hero.reassurance}</p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-x-6 top-8 bottom-0 rounded-card bg-purple-light/40" aria-hidden="true" />
            <Image
              src="/assets/mockup-app/french/club.png"
              alt={page.heroMockupAlt}
              width={320}
              height={650}
              priority
              className="relative mx-auto h-auto w-64 rotate-2 drop-shadow-xl md:w-72"
            />
            <Image
              src="/assets/pictures/amis-allonges-par-terre.avif"
              alt={page.heroPhotoAlt}
              width={224}
              height={150}
              priority
              className="absolute -left-2 bottom-6 hidden h-auto w-44 -rotate-3 rounded-2xl border-4 border-white object-cover shadow-lg md:block lg:w-56"
            />
          </div>
        </div>
      </section>

      {/* Ce qui t'attend — preuve par procuration (bascule sur vrais Clubs parisiens dès ≥ 3) */}
      <section className="border-y border-ink/10 bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{page.awaitTitle}</h2>
          <p className="mt-3 max-w-2xl text-lg">{page.awaitIntro}</p>
          <p className="mt-8 font-bold">{page.awaitStatsTitle}</p>
          <dl className="mt-4 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-card bg-blue-light/30 p-6 text-center">
              <dt className="font-display text-3xl">{LIVE_STATS.usersMontreal}</dt>
              <dd className="mt-1 text-ink/70">{page.awaitStatUsers}</dd>
            </div>
            <div className="rounded-card bg-green-light/30 p-6 text-center">
              <dt className="font-display text-3xl">{LIVE_STATS.events30d}</dt>
              <dd className="mt-1 text-ink/70">{page.awaitStatEvents}</dd>
            </div>
            <div className="rounded-card bg-pink-light/40 p-6 text-center">
              <dt className="font-display text-3xl">{LIVE_STATS.clubsTotal}</dt>
              <dd className="mt-1 text-ink/70">{page.awaitStatClubs}</dd>
            </div>
          </dl>
          <p className="mt-8 max-w-3xl text-ink/80">{page.awaitBody}</p>
          <p className="mt-4 max-w-3xl text-lg font-bold">{page.awaitRelay}</p>
          <div className="mt-8">
            <DownloadButton label={page.ctaPrimary} />
          </div>
        </div>
      </section>

      {/* Comment ça marche — identique à la home */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">{dict.how.title}</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {dict.how.steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-white ${accentBar[ACCENTS[i % 4]]}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-2 text-ink/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Reconnais-toi — Organisateur en premier */}
      <section className="bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{dict.personas.title}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {personaOrder.map((cardIndex, i) => {
              const card = dict.personas.cards[cardIndex];
              return (
                <li key={card.title} className={`rounded-card p-6 md:p-8 ${accentBg[personaAccents[i]]}`}>
                  <h3 className="text-2xl">{card.title}</h3>
                  <p className="mt-3 text-ink/80">{card.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TrustSection dict={dict} />
      <FinalCta dict={dict} subtitle={page.finalSubtitle} ctaLabel={page.ctaPrimary} />
    </>
  );
}

/* ─── Shared sections ─── */

function TrustSection({ dict }: { dict: Dict }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="rounded-card bg-green-light/25 p-8 md:p-12">
        <h2 className="max-w-3xl text-3xl md:text-4xl">{dict.trust.title}</h2>
        <ul className="mt-8 max-w-2xl space-y-4">
          {dict.trust.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green" />
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCta({
  dict,
  subtitle,
  ctaLabel,
}: {
  dict: Dict;
  subtitle: string;
  ctaLabel?: string;
}) {
  return (
    <section className="bg-blue">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-4xl text-white md:text-5xl">{dict.finalCta.title}</h2>
        <p className="mt-4 text-lg text-white/90">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center gap-5">
          <DownloadButton label={ctaLabel ?? dict.finalCta.cta} light />
          <StoreBadges dict={dict} />
          <p className="text-sm text-white/80">{dict.finalCta.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
