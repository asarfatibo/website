import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/lib/i18n";

/*
  Blog content contract (see content/blog/README.md and the blog_writer agent):
  content/blog/{slug}/fr.md + en.md — frontmatter + markdown body starting at ##.
  The trailing "## FAQ" section (### question + answer paragraphs) feeds the
  FAQPage JSON-LD on the article page.
*/

export type BlogPostMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string; // YYYY-MM-DD, first publication
  updated: string;
  keywords: string[];
  city: "montreal" | "paris" | "both";
  locales: Locale[]; // which language files exist for this slug
};

export type BlogPost = BlogPostMeta & {
  html: string;
  faq: Array<{ q: string; a: string }>;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function postLocales(slug: string): Locale[] {
  const out: Locale[] = [];
  for (const locale of ["fr", "en"] as const) {
    if (fs.existsSync(path.join(BLOG_DIR, slug, `${locale}.md`))) out.push(locale);
  }
  return out;
}

function readMeta(slug: string, locale: Locale): BlogPostMeta | null {
  const file = path.join(BLOG_DIR, slug, `${locale}.md`);
  if (!fs.existsSync(file)) return null;
  const { data } = matter(fs.readFileSync(file, "utf8"));
  if (!data.title || !data.description || !data.date) return null;
  return {
    slug,
    title: String(data.title),
    metaTitle: String(data.metaTitle ?? data.title),
    description: String(data.description),
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    city: data.city === "paris" || data.city === "both" ? data.city : "montreal",
    locales: postLocales(slug),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// Newest first. A slug missing the requested locale falls back to nothing
// (each article ships FR+EN per the contract, but a half-published slug must
// not break the listing).
export function getAllPosts(locale: Locale): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => readMeta(slug, locale))
    .filter((meta): meta is BlogPostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function hasBlogPosts(): boolean {
  return getAllSlugs().some((slug) => postLocales(slug).length > 0);
}

// Strip markdown syntax for JSON-LD plain-text answers.
function plainText(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaq(body: string): Array<{ q: string; a: string }> {
  const faqSection = body.split(/\n## /).find((section) => /^FAQ\s*\n/i.test(section));
  if (!faqSection) return [];
  return faqSection
    .split(/\n### /)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split("\n");
      return { q: plainText(q), a: plainText(rest.join("\n")) };
    })
    .filter((item) => item.q && item.a);
}

export function getPost(slug: string, locale: Locale): BlogPost | null {
  const meta = readMeta(slug, locale);
  if (!meta) return null;
  const { content } = matter(fs.readFileSync(path.join(BLOG_DIR, slug, `${locale}.md`), "utf8"));
  return {
    ...meta,
    html: marked.parse(content, { async: false }),
    faq: extractFaq(content),
  };
}
