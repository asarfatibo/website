# Blog content contract

Articles are written by the `blog_writer` agent (marketing repo,
`.claude/agents/blog_writer.md`) and rendered by `app/[locale]/blog/`.

## Layout

```
content/blog/{slug}/fr.md
content/blog/{slug}/en.md
```

One kebab-case slug per article, stable across locales. Both language files
ship together.

## Frontmatter (required)

```yaml
---
title: ""            # H1, <= 70 chars — the user's question/query
metaTitle: ""        # <= 60 chars
description: ""      # meta description, 140-160 chars
date: "YYYY-MM-DD"   # first publication — never changes
updated: "YYYY-MM-DD"
keywords: ["", ""]   # primary first
city: "montreal"     # montreal | paris | both
---
```

## Body rules

- Pure markdown, starting at `##` (the `title` frontmatter IS the H1 — never
  repeat it in the body).
- The last section must be `## FAQ` with `### question` + one answer paragraph
  per item — it is parsed into FAQPage JSON-LD by the article route.
- Blockquotes render as highlight cards (used for the canonical
  "C'est quoi bubbleOut ?" box).
- Publishing = commit these files and push to master; the rebuild updates the
  listing, the sitemap, and the footer link automatically.
