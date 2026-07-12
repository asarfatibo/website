/*
  Refreshes the home Instagram section: downloads the 4 latest post
  thumbnails of @bubbleout.irl into public/instagram/ and rewrites
  lib/instagram-posts.json. Never fails the build: on any error the committed
  posts stay as-is and the script exits 0.

  Uses the Facebook Graph API (Instagram Business account linked to the
  BubbleOut Facebook Page): resolve the IG account id via /me/accounts, then
  read its /media. META_API_TOKEN must be a Facebook token ("EAA…"), not an
  Instagram-Login token ("IGAA…").

  Run: npm run data:instagram   (META_API_TOKEN from .env.local or environment)
*/
import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
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

const GRAPH = "https://graph.facebook.com/v21.0";
const IG_USERNAME = "bubbleout.irl";

async function graph(path) {
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${GRAPH}/${path}${sep}access_token=${token}`);
  const json = await res.json();
  if (json.error) throw new Error(`${json.error.message} (code ${json.error.code})`);
  return json;
}

try {
  // Resolve the Instagram Business account id from the Pages the token manages.
  // Prefer the page whose IG username matches; fall back to the first linked.
  const accounts = await graph("me/accounts?fields=name,instagram_business_account{id,username}");
  const linked = (accounts.data ?? []).map((p) => p.instagram_business_account).filter(Boolean);
  const ig = linked.find((a) => a.username === IG_USERNAME) ?? linked[0];
  if (!ig) throw new Error("no Instagram Business account linked to this token");

  const { data } = await graph(
    `${ig.id}/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp,caption,children{media_url,thumbnail_url}&limit=8`,
  );

  mkdirSync("public/instagram", { recursive: true });
  const posts = [];
  for (const p of data ?? []) {
    if (posts.length >= 4) break;
    // Carousels expose their cover via the first child rather than media_url.
    const firstChild = p.children?.data?.[0];
    const img = p.media_url || p.thumbnail_url || firstChild?.media_url || firstChild?.thumbnail_url;
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

  // Prune covers no longer referenced so old posts don't pile up in the repo.
  const keep = new Set(posts.map((p) => p.image.split("/").pop()));
  for (const f of readdirSync("public/instagram")) {
    if (f.endsWith(".jpg") && !keep.has(f)) rmSync(`public/instagram/${f}`);
  }

  writeFileSync("lib/instagram-posts.json", JSON.stringify(posts, null, 2) + "\n");
  console.log(`[fetch-instagram] OK - ${posts.length} posts (${posts[0].date} ... ${posts.at(-1).date}) from @${ig.username}`);
} catch (err) {
  console.log(`[fetch-instagram] FAILED (${String(err).slice(0, 120)}) - keeping committed posts.`);
}
process.exit(0);
