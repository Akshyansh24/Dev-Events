import mongoose, { type Mongoose } from "mongoose";

interface MongooseCache {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Keep the cache on globalThis so it survives Next.js development reloads.
  var mongooseCache: MongooseCache | undefined;
}

const cache = (globalThis.mongooseCache ??= {
  connection: null,
  promise: null,
});

export async function connectToDatabase(): Promise<Mongoose> {
  if (cache.connection) return cache.connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // Reuse an in-flight connection attempt to avoid opening duplicate connections.
  cache.promise ??= mongoose.connect(uri);

  try {
    cache.connection = await cache.promise;
  } catch (error) {
    // Allow a later request to retry if this connection attempt fails.
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
