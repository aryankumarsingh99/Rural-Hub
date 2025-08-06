// src/lib/connectDB.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Log environment status at module load
console.log('🔍 ConnectDB module loaded');
console.log('🔍 MONGODB_URI status:', MONGODB_URI ? 'Found' : 'Missing');

// Don't throw error during build, only during runtime
if (!MONGODB_URI && typeof window === 'undefined') {
  console.error('❌ MONGODB_URI environment variable is not defined');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  console.log('🔄 connectDB function called');
  
  // Check for MONGODB_URI at runtime
  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI environment variable is not defined. Please check your Vercel environment variables.');
    console.error('❌', error.message);
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')));
    throw error;
  }

  console.log('✅ MONGODB_URI found, length:', MONGODB_URI.length);

  if (cached.conn) {
    console.log('🔄 Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // Reduced timeout for faster debugging
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true
    };

    console.log('🔄 Creating new database connection...');
    console.log('🔍 MongoDB URI preview:', MONGODB_URI.substring(0, 50) + '...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Connection readyState:', mongoose.connection.readyState);
        console.log('🏷️ Database name:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error details:', {
          message: error.message,
          name: error.name,
          code: error.code,
          codeName: error.codeName,
          reason: error.reason
        });
        
        // Clear the promise so we can retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Database connection established successfully');
  } catch (e) {
    cached.promise = null;
    console.error('❌ Failed to establish MongoDB connection:', {
      message: e.message,
      name: e.name,
      code: e.code,
      stack: e.stack
    });
    throw e;
  }

  return cached.conn;
};

export default connectDB;