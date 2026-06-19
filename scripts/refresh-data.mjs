/*
  Refreshes lib/live-data.json from MongoDB (read-only).
  Method mirrors marketing/.claude/agents/data-fetcher.md (team exclusions,
  active users, email dedupe, Step 2b network union). Never fails the build:
  on any error the committed JSON stays as-is and the script exits 0.

  Run: npm run data:refresh   (MONGODB_URI from .env.local or environment)
*/
import { MongoClient } from "mongodb";
import { readFileSync, writeFileSync } from "node:fs";

try {
  process.loadEnvFile(".env.local");
} catch {}

const TEAM_IDS = [
  "67e43248b5ee7b8bc00f022b",
  "687baee5294d518b193799fe",
  "68f01731d94d407e4cfef69a",
  "68f4fcfd7a5348aabd413c64",
  "68f5370f7a5348aabd423ff6",
  "691f76d20e07855a65992474",
  "691f806d0e07855a65993eee",
];

const SHOWCASE_CLUB_NAMES = [
  // Home showcase
  "Time to apéritz",
  "MTL Sound Club 🪩",
  "Club Run MTL",
  "Le club des loups-garous ( Jeu 🐺 )",
  // /montreal showcase (distinct set)
  "Beach Volley mtl 🏐",
  "Be.u Community",
  "club techno rave",
  "Vin sur Vin Mtl",
];

const OUT = "lib/live-data.json";

function floor50Display(n) {
  const floored = Math.floor(n / 50) * 50;
  return `${floored.toLocaleString("fr-FR").replace(/ | /g, " ")}+`;
}

function userPipeline(cityNames) {
  return [
    { $match: { name: { $in: cityNames } } },
    { $unwind: "$users" },
    { $group: { _id: "$users" } },
    { $match: { _id: { $nin: TEAM_IDS } } },
    { $addFields: { uid: { $convert: { input: "$_id", to: "objectId", onError: null, onNull: null } } } },
    { $match: { uid: { $ne: null } } },
    { $lookup: { from: "user_master", localField: "uid", foreignField: "_id", as: "u" } },
    { $unwind: "$u" },
    { $match: { "u.deleted_at": null, "u.is_active": true } },
    { $group: { _id: "$u.email" } },
    { $count: "n" },
  ];
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("[refresh-data] MONGODB_URI missing - keeping committed snapshot.");
  process.exit(0);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

try {
  await client.connect();
  const db = client.db("cohexia");
  const monthAgo = new Date(Date.now() - 30 * 24 * 3600 * 1000);

  const [network] = await db.collection("anchor_city_zone").aggregate(userPipeline(["Montreal", "Paris"])).toArray();
  const [mtl] = await db.collection("anchor_city_zone").aggregate(userPipeline(["Montreal"])).toArray();

  const teamObjectIds = TEAM_IDS.map((id) => ({ $oid: id }));
  const [events30] = await db
    .collection("event_master")
    .aggregate([
      {
        $match: {
          createdAt: { $gte: monthAgo },
          start_date: { $gte: new Date("2025-10-01T00:00:00Z") },
          localisation: { $regex: "\\b(Montreal|Montréal|Canada)\\b", $options: "i" },
          $or: [{ deletedAt: null }, { $expr: { $gte: ["$deletedAt", "$start_date"] } }],
        },
      },
      { $count: "n" },
    ])
    .toArray();

  // Feedback scoped to validated Montréal events (data-fetcher Step 6 method:
  // never an unscoped average — test/out-of-scope events would skew it).
  const mtlEventIds = await db
    .collection("event_master")
    .find(
      {
        start_date: { $gte: new Date("2025-10-01T00:00:00Z") },
        localisation: { $regex: "\\b(Montreal|Montréal|Canada)\\b", $options: "i" },
        $or: [{ deletedAt: null }, { $expr: { $gte: ["$deletedAt", "$start_date"] } }],
      },
      { projection: { _id: 1 } },
    )
    .map((d) => d._id)
    .toArray();

  const [feedback] = await db
    .collection("event_feedback_master")
    .aggregate([
      { $match: { event: { $in: mtlEventIds }, isOrganizer: false, feedback: { $ne: null } } },
      { $group: { _id: null, avg: { $avg: "$feedback" }, n: { $sum: 1 } } },
    ])
    .toArray();

  const clubMatch = {
    deletedAt: null,
    isDefaultClub: { $ne: true },
    localisation: { $regex: "\\b(Montreal|Montréal|Canada)\\b", $options: "i" },
  };
  const clubsTotal = await db.collection("club_master").countDocuments(clubMatch);

  const showcaseClubs = await db
    .collection("club_master")
    .aggregate([
      { $match: { name: { $in: SHOWCASE_CLUB_NAMES }, deletedAt: null } },
      {
        $lookup: {
          from: "club_like_master",
          let: { cid: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$club", "$$cid"] }, { $eq: ["$status", "joined"] }] } } },
            { $group: { _id: null, users: { $addToSet: "$user" } } },
          ],
          as: "m",
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          members: { $size: { $ifNull: [{ $arrayElemAt: ["$m.users", 0] }, []] } },
        },
      },
    ])
    .toArray();

  const prev = JSON.parse(readFileSync(OUT, "utf-8"));
  const ratingOk = feedback && feedback.n >= 20;
  const data = {
    generatedAt: new Date().toISOString().slice(0, 10),
    stats: {
      usersMtlParis: network?.n ?? prev.stats.usersMtlParis,
      usersDisplay: network ? floor50Display(network.n) : prev.stats.usersDisplay,
      usersMontreal: mtl?.n ?? prev.stats.usersMontreal,
      events30d: events30?.n ?? prev.stats.events30d,
      // Rule: averages on n<20 are not published (data-fetcher constraint).
      rating: ratingOk ? `${(Math.round(feedback.avg * 10) / 10).toLocaleString("fr-FR")} / 5` : prev.stats.rating,
      clubsTotal: clubsTotal || prev.stats.clubsTotal,
    },
    clubMembers: Object.fromEntries(showcaseClubs.map((c) => [c.name, c.members])),
  };

  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[refresh-data] OK - ${JSON.stringify(data.stats)}`);
} catch (err) {
  console.log(`[refresh-data] FAILED (${String(err).slice(0, 120)}) - keeping committed snapshot.`);
} finally {
  await client.close().catch(() => {});
  process.exit(0);
}
