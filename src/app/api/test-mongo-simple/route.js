// src/app/api/test-mongo-simple/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const { testUri } = await request.json();
    
    console.log('🔄 Testing custom MongoDB URI...');
    
    // Disconnect any existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('🔄 Disconnected from previous connection');
    }

    const uri = testUri || process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('No MongoDB URI provided');
    }

    console.log('🔍 URI preview:', uri.substring(0, 50) + '...');

    await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    console.log('✅ Test connection successful');

    return NextResponse.json({
      success: true,
      message: 'Test connection successful',
      dbName: mongoose.connection.name,
      readyState: mongoose.connection.readyState
    });

  } catch (error) {
    console.error('❌ Test connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      name: error.name
    }, { status: 500 });
  }
}