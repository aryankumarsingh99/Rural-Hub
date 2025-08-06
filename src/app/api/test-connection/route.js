// src/app/api/test-connection/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Test the exact URI from your env file
    const testUri = "mongodb+srv://aryansingh:qqMuQRUVTPbQ2aE5@cluster0.jfyfxle.mongodb.net/Rural-Hub?retryWrites=true&w=majority";
    
    console.log('Testing connection to:', testUri.substring(0, 50) + '...');
    
    // Disconnect any existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    await mongoose.connect(testUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    console.log('✅ Connection successful');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      dbName: mongoose.connection.name,
      host: mongoose.connection.host
    });

  } catch (error) {
    console.error('❌ Connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      name: error.name
    }, { status: 500 });
  }
}