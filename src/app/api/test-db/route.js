// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export async function GET() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found');
    }
    
    console.log('✅ MONGODB_URI found');
    
    // Test database connection
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Test a simple query
    const userCount = await User.countDocuments();
    console.log('✅ Database query successful, user count:', userCount);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        codeName: error.codeName
      }
    }, { status: 500 });
  }
}