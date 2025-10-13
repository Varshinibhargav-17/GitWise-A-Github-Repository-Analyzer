import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined");
  throw new Error("Please define MONGODB_URI in environment variables");
}

console.log("MONGODB_URI exists:", !!MONGODB_URI);
console.log("MONGODB_URI starts with mongodb:", MONGODB_URI.startsWith("mongodb"));

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log("Attempting to connect to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Successfully connected to MongoDB");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        code: error.code,
      });
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connection established");
    return cached.conn;
  } catch (error) {
    console.error("Failed to establish MongoDB connection:", error);
    throw error;
  }
}
