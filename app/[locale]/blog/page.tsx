import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";

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
  const blog = dict.blog;
  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog", "x-default": "/fr/blog" },
    },
    openGraph: {
      siteName: "bubbleOut",
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: `/${locale}/blog`,
      title: blog.metaTitle,
      description: blog.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const blog = dict.blog;
  const posts = getAllPosts(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl font-extrabold text-ink md:text-5xl">{blog.h1}</h1>
      <p className="mt-3 text-lg text-ink/60">{blog.intro}</p>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-card bg-white/60 p-8 text-ink/60">{blog.empty}</p>
      ) : (
        <ul className="mt-12 space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="block rounded-card bg-white/60 p-6 shadow-sm transition-transform hover:-translate-y-0.5 md:p-8"
              >
                <p className="text-sm text-ink/50">
                  {formatDate(post.date, locale)} · {blog.cityTags[post.city]}
                </p>
                <h2 className="mt-2 text-2xl leading-snug">{post.title}</h2>
                <p className="mt-3 text-ink/70">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
