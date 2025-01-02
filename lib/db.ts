import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
    var mongoose: any | undefined;
  }
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // Increase the timeout to 15 seconds
    };

    mongoose.set('strictQuery', true);

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export { connectToDatabase };

