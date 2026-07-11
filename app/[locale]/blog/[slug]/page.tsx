import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/constants";
import { getAllSlugs, getPost } from "@/lib/blog";
import { DownloadButton } from "@/components/ui";
import { StoreBadges } from "@/components/StoreBadges";

// New articles arrive via git push (blog_writer agent), which triggers a
// rebuild — unknown slugs are a hard 404, never rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug, locale);
  if (!post) notFound();

  const languages: Record<string, string> = { "x-default": `/fr/blog/${slug}` };
  for (const l of post.locales) languages[l] = `/${l}/blog/${slug}`;

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "article",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/blog/${slug}`,
      title: post.metaTitle,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
    },
  };
}

function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Montreal",
  }).format(new Date(`${date}T12:00:00Z`));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const blog = dict.blog;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const jsonLd: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated,
      inLanguage: locale,
      keywords: post.keywords.join(", "),
      mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
      author: { "@type": "Organization", name: "bubbleOut", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "bubbleOut",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo/logo.svg` },
      },
    },
  ];
  if (post.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <article className="mx-auto max-w-3xl px-4 py-14">
        <Link href={`/${locale}/blog`} className="text-sm text-ink/60 hover:underline">
          ← {blog.backToBlog}
        </Link>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-ink/50">
          {blog.publishedOn} {formatDate(post.date, locale)}
          {post.updated !== post.date && (
            <> · {blog.updatedOn} {formatDate(post.updated, locale)}</>
          )}
          {" · "}
          {blog.cityTags[post.city]}
        </p>

        <div className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-16 rounded-card bg-blue px-8 py-10 text-center">
          <h2 className="text-2xl text-white md:text-3xl">{dict.finalCta.title}</h2>
          <div className="mt-6 flex flex-col items-center gap-4">
            <DownloadButton label={dict.finalCta.cta} light />
            <StoreBadges dict={dict} />
          </div>
        </div>
      </article>
    </>
  );
}
