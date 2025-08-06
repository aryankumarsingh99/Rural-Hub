// src/app/api/test-mongo/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found');
    }

    console.log('MongoDB URI found, attempting connection...');
    
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return NextResponse.json({
        success: true,
        message: 'Already connected to MongoDB',
        readyState: mongoose.connection.readyState
      });
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('MongoDB connected successfully');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully',
      readyState: mongoose.connection.readyState,
      dbName: mongoose.connection.name
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      name: error.name
    }, { status: 500 });
  }
}