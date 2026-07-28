import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseConnection: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseConnection) {
  global.mongooseConnection = cached;
}

export async function connectMongo() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it in .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 3500,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getMongoSetupMessage(error?: unknown) {
  const details = error instanceof Error ? ` (${error.message})` : "";

  return `MongoDB connect nahi ho raha. Local MongoDB start karo ya .env.local me MongoDB Atlas URI set karo.${details}`;
}
