// src/app/api/auth/register-simple/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('🚀 Simple registration API called');
  
  try {
    // Step 1: Parse request
    const body = await request.json();
    console.log('✅ Step 1: Request parsed');

    // Step 2: Validate input
    const { firstName, lastName, email, password } = body;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }
    console.log('✅ Step 2: Input validated');

    // Step 3: Check environment
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI not configured'
      }, { status: 500 });
    }
    console.log('✅ Step 3: Environment checked');

    // Step 4: Import bcrypt
    const bcrypt = (await import('bcryptjs')).default;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Step 4: Password hashed');

    // Step 5: Import and test DB connection
    const connectDB = (await import('@/lib/connectDB')).default;
    await connectDB();
    console.log('✅ Step 5: Database connected');

    // Step 6: Import User model
    const User = (await import('@/models/User')).default;
    console.log('✅ Step 6: User model imported');

    // Step 7: Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User already exists'
      }, { status: 400 });
    }
    console.log('✅ Step 7: User availability checked');

    // Step 8: Create user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: body.phone || ''
    });

    await user.save();
    console.log('✅ Step 8: User created');

    // Step 9: Generate token
    const jwt = (await import('jsonwebtoken')).default;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    console.log('✅ Step 9: Token generated');

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('❌ Registration error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });

    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code
      }
    }, { status: 500 });
  }
}