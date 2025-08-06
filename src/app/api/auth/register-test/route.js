// src/app/api/auth/register-test/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('🚀 Test registration API called');
  
  try {
    // Step 1: Check if we can parse the request
    console.log('Step 1: Parsing request body...');
    const body = await request.json();
    console.log('✅ Request body parsed:', Object.keys(body));

    // Step 2: Check environment variables
    console.log('Step 2: Checking environment variables...');
    const envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      JWT_SECRET: !!process.env.JWT_SECRET
    };
    console.log('Environment variables:', envCheck);

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI not found',
        step: 'Environment Check'
      }, { status: 500 });
    }

    // Step 3: Try to import connectDB
    console.log('Step 3: Importing connectDB...');
    const connectDB = (await import('@/lib/connectDB')).default;
    console.log('✅ connectDB imported successfully');

    // Step 4: Try to connect to database
    console.log('Step 4: Attempting database connection...');
    await connectDB();
    console.log('✅ Database connected successfully');

    // Step 5: Try to import User model
    console.log('Step 5: Importing User model...');
    const User = (await import('@/models/User')).default;
    console.log('✅ User model imported successfully');

    // Step 6: Try bcrypt
    console.log('Step 6: Testing bcrypt...');
    const bcrypt = (await import('bcryptjs')).default;
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    console.log('✅ Bcrypt working successfully');

    // Step 7: Try JWT
    console.log('Step 7: Testing JWT...');
    const jwt = (await import('jsonwebtoken')).default;
    const testToken = jwt.sign({ test: 'data' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('✅ JWT working successfully');

    return NextResponse.json({
      success: true,
      message: 'All components working correctly',
      steps: [
        'Request parsing ✅',
        'Environment variables ✅',
        'Database connection ✅',
        'User model ✅',
        'Bcrypt ✅',
        'JWT ✅'
      ]
    });

  } catch (error) {
    console.error('❌ Test registration error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      name: error.name,
      stack: error.stack
    }, { status: 500 });
  }
}