import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import {
  APP_RATING,
  CURATED_EVENTS,
  DOWNLOAD_LINK,
  LIVE_STATS,
  REVIEWS,
  SHOWCASE_CLUBS,
  SITE_URL,
  SOCIAL_LINKS,
  STORE_LINKS,
} from "@/lib/constants";
import { StoreBadges } from "@/components/StoreBadges";
import { DownloadButton, Stars } from "@/components/ui";
import { CityModule } from "@/components/CityModule";
import { EventsGrid } from "@/components/EventsGrid";
import { getUpcomingMontrealEvents } from "@/lib/events";
import { ACCENTS, accentBar, accentBg, accentTag, type Accent } from "@/lib/theme";
import instagramPosts from "@/lib/instagram-posts.json";

// ISR: the live Events module refreshes every hour without a rebuild.
export const revalidate = 3600;


const PERSONA_PHOTOS = [
  "/assets/pictures/photo-walk-group.avif",
  "/assets/pictures/eating-groups.avif",
  "/assets/pictures/barbecue-party.png",
  "/assets/pictures/soiree-dehors.png",
] as const;

const HOW_SCREENS = [
  "/assets/mockup-app/french/club.png",
  "/assets/mockup-app/french/propose_hangout.png",
  "/assets/mockup-app/french/chat.png",
] as const;


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const liveEvents = await getUpcomingMontrealEvents();
  const events = liveEvents ?? CURATED_EVENTS;
  const isLive = liveEvents !== null;

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* S2 — Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
          <div>
            <h1 className="text-4xl leading-tight md:text-6xl">{dict.hero.h1}</h1>
            <p className="mt-6 max-w-xl text-lg md:text-xl">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton label={dict.hero.cta} />
              <StoreBadges dict={dict} />
            </div>
            <p className="mt-4 text-sm text-ink/60">{dict.hero.reassurance}</p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-x-6 top-8 bottom-0 rounded-card bg-blue-light/40" aria-hidden="true" />
            <Image
              src="/assets/mockup-app/french/find_your_community.png"
              alt={dict.hero.mockupAlt}
              width={320}
              height={650}
              priority
              className="relative mx-auto h-auto w-64 rotate-2 drop-shadow-xl md:w-72"
            />
            <Image
              src="/assets/pictures/pique-nique-parc.png"
              alt={dict.hero.heroPhotoAlt}
              width={224}
              height={150}
              priority
              className="absolute -left-2 bottom-6 hidden h-auto w-44 -rotate-3 rounded-2xl border-4 border-white object-cover shadow-lg md:block lg:w-56"
            />
          </div>
        </div>
      </section>

      {/* S3 — Preuve sociale */}
      <section className="border-y border-ink/10 bg-white/50">
        <h2 className="sr-only">{dict.proof.srTitle}</h2>
        <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-center sm:grid-cols-3">
          <div>
            <dt className="font-display text-4xl md:text-5xl">{LIVE_STATS.usersDisplay}</dt>
            <dd className="mt-1 text-ink/70">{dict.proof.users}</dd>
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

      {/* S4 — Module ville actif : Events live (ISR 1 h, fallback curaté) ou bloc pionnier Paris */}
      <CityModule
        labels={{
          montreal: dict.header.cities.montreal,
          paris: dict.header.cities.paris,
          switchLabel: dict.header.citySwitchLabel,
        }}
        montreal={
          <div>
            <h2 className="text-3xl md:text-4xl">
              {isLive ? dict.cityModule.montreal.title : dict.cityModule.montreal.fallbackTitle}
            </h2>
            <p className="mt-3 text-lg text-ink/70">
              {isLive ? dict.cityModule.montreal.subtitle : dict.cityModule.montreal.fallbackSubtitle}
            </p>
            <div className="mt-10">
              <EventsGrid events={events} />
            </div>
            <div className="mt-10">
              <DownloadButton label={dict.cityModule.montreal.cta} />
            </div>
          </div>
        }
        paris={
          <div>
            <h2 className="text-3xl md:text-4xl">{dict.cityModule.paris.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">{dict.cityModule.paris.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton label={dict.cityModule.paris.ctaPrimary} />
              <a
                href={DOWNLOAD_LINK}
                className="rounded-cta border-2 border-ink px-6 py-3 font-bold transition-colors hover:bg-ink hover:text-cream"
              >
                {dict.cityModule.paris.ctaSecondary}
              </a>
            </div>
          </div>
        }
      />

      {/* S5 — Comment ça marche */}
      <section className="bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{dict.how.title}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {dict.how.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col">
                <div className={`mx-auto w-full max-w-56 rounded-card p-4 pb-0 ${accentBg[ACCENTS[i % 4]]}`}>
                  <Image
                    src={HOW_SCREENS[i]}
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

      {/* S6 — Des Clubs qui durent */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">{dict.clubs.title}</h2>
        <p className="mt-3 max-w-2xl text-lg">{dict.clubs.intro}</p>
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
                <span
                  className={`inline-block rounded-cta px-2.5 py-0.5 text-xs font-bold ${accentTag[club.themeColor as Accent]}`}
                >
                  {club.theme}
                </span>
                <h3 className="mt-3 text-lg leading-snug">{club.name}</h3>
                <p className="mt-1 text-sm text-ink/60">
                  {club.members} {dict.clubs.membersSuffix}
                </p>
                <p className="mt-3 text-sm italic text-ink/80">{club.line}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <DownloadButton label={dict.clubs.cta} />
        </div>
      </section>

      {/* S7 — Reconnais-toi */}
      <section className="bg-white/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl">{dict.personas.title}</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {dict.personas.cards.map((card, i) => (
              <li
                key={card.title}
                className={`flex gap-5 rounded-card p-6 md:p-8 ${accentBg[ACCENTS[i % 4]]}`}
              >
                <Image
                  src={PERSONA_PHOTOS[i]}
                  alt=""
                  width={112}
                  height={112}
                  className="hidden h-28 w-28 shrink-0 rounded-2xl object-cover sm:block"
                />
                <div>
                  <h3 className="text-2xl">{card.title}</h3>
                  <p className="mt-3 text-ink/80">{card.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avis — vrais avis App Store, verbatim */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl">{dict.reviews.title}</h2>
        <p className="mt-3 flex items-center gap-3 text-lg">
          <span className="font-display text-2xl">{APP_RATING.score}</span>
          <Stars label={dict.reviews.starsLabel} />
          <span className="text-ink/60">{dict.reviews.ratingLine}</span>
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li key={review.author} className="rounded-card bg-white/70 p-6 shadow-sm">
              <Stars label={dict.reviews.starsLabel} />
              <h3 className="mt-3 text-lg">{review.title}</h3>
              <p className="mt-2 text-ink/80">« {review.text} »</p>
              <p className="mt-4 text-sm text-ink/50">— {review.author}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/50">{dict.reviews.sourceNote}</p>
      </section>

      {/* S8 — Réassurance */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
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

      {/* Instagram — vrais derniers posts @bubbleout.mtl */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <h2 className="text-3xl md:text-4xl">{dict.instagram.title}</h2>
        <p className="mt-3 text-lg text-ink/70">{dict.instagram.subtitle}</p>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {instagramPosts.map((post) => (
            <li key={post.permalink}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dict.instagram.postLabel} ${post.date}`}
                className="group block overflow-hidden rounded-card"
              >
                <Image
                  src={post.image}
                  alt={post.captionExcerpt}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-cta border-2 border-ink px-6 py-3 font-bold transition-colors hover:bg-ink hover:text-cream"
          >
            <Image src="/assets/socials-icon/instagram-logo-facebook-2-svgrepo-com.svg" alt="" width={20} height={20} />
            {dict.instagram.cta}
          </a>
        </div>
      </section>

      {/* S9 — CTA final */}
      <section className="bg-blue">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-4xl text-white md:text-5xl">{dict.finalCta.title}</h2>
          <div className="mt-8 flex flex-col items-center gap-5">
            <DownloadButton label={dict.finalCta.cta} light />
            <StoreBadges dict={dict} />
            <p className="text-sm text-white/80">{dict.finalCta.microcopy}</p>
          </div>
        </div>
      </section>
    </>
  );
}
