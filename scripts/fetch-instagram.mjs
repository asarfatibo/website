/*
  Refreshes the home Instagram section: downloads the 4 latest post
  thumbnails of @bubbleout.mtl (Meta Graph API) into public/instagram/ and
  rewrites lib/instagram-posts.json. Never fails the build: on any error the
  committed posts stay as-is and the script exits 0.

  Run: npm run data:instagram   (META_API_TOKEN from .env.local or environment)
*/
import { writeFileSync, mkdirSync } from "node:fs";
import { Readable } from "node:stream";
import { writeFile } from "node:fs/promises";

try {
  process.loadEnvFile(".env.local");
} catch {}

const token = process.env.META_API_TOKEN;
if (!token) {
  console.log("[fetch-instagram] META_API_TOKEN missing - keeping committed posts.");
  process.exit(0);
}

try {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp,caption&limit=8&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Graph API ${res.status}`);
  const { data } = await res.json();

  mkdirSync("public/instagram", { recursive: true });
  const posts = [];
  for (const p of data ?? []) {
    if (posts.length >= 4) break;
    const img = p.media_url || p.thumbnail_url;
    if (!img) continue;
    const date = p.timestamp.slice(0, 10);
    const file = `post-${date}-${p.id.slice(-6)}.jpg`;
    const imgRes = await fetch(img);
    if (!imgRes.ok) continue;
    await writeFile(`public/instagram/${file}`, Readable.fromWeb(imgRes.body));
    posts.push({
      image: `/instagram/${file}`,
      permalink: p.permalink,
      date,
      type: p.media_type,
      captionExcerpt: (p.caption ?? "").split("\n")[0].slice(0, 90),
    });
  }

  if (posts.length === 0) throw new Error("no posts with media");
  writeFileSync("lib/instagram-posts.json", JSON.stringify(posts, null, 2) + "\n");
  console.log(`[fetch-instagram] OK - ${posts.length} posts (${posts[0].date} ... ${posts.at(-1).date})`);
} catch (err) {
  console.log(`[fetch-instagram] FAILED (${String(err).slice(0, 120)}) - keeping committed posts.`);
}
process.exit(0);
