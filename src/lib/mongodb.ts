import mongoose from 'mongoose';

interface MongooseGlobalCache {
  conn: typeof import('mongoose') | null;
  promise: Promise<typeof import('mongoose')> | null;
}

declare global {
  // Allow reuse of cache in dev mode
  let mongooseCache: MongooseGlobalCache | undefined;
}
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// ✅ Global cache (for Next.js hot reload and API reusage)
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
