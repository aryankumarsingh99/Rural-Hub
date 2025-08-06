// src/lib/connectDB.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Don't throw error during build, only during runtime
if (!MONGODB_URI && typeof window === 'undefined') {
  console.error('❌ MONGODB_URI environment variable is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Check for MONGODB_URI at runtime
  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI environment variable is not defined. Please check your Vercel environment variables.');
    console.error('❌', error.message);
    throw error;
  }

  if (cached.conn) {
    console.log('🔄 Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 15000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    };

    console.log('🔄 Creating new database connection...');
    console.log('🔍 MongoDB URI (first 50 chars):', MONGODB_URI.substring(0, 50) + '...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Connection readyState:', mongoose.connection.readyState);
        console.log('🏷️ Database name:', mongoose.connection.name);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error details:', {
          message: error.message,
          name: error.name,
          code: error.code,
          codeName: error.codeName
        });
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Failed to connect to MongoDB:', {
      message: e.message,
      name: e.name,
      code: e.code
    });
    throw e;
  }

  return cached.conn;
};

export default connectDB;