import { MongoClient, type Db } from "mongodb";

/*
  Read-only MongoDB access (same `claude` read-only user as the marketing
  MCP config). The site must NEVER hard-fail on DB unavailability: every
  consumer falls back to the committed snapshot data.
*/
const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient> | null = null;

export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  try {
    if (!clientPromise) {
      clientPromise = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      }).connect();
    }
    const client = await clientPromise;
    return client.db("cohexia");
  } catch {
    clientPromise = null;
    return null;
  }
}
