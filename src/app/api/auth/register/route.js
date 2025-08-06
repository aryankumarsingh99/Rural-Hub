// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export async function POST(request) {
  console.log('🚀 Registration API called');
  
  try {
    // Check environment variables first
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'Database configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'JWT configuration error' },
        { status: 500 }
      );
    }

    console.log('✅ Environment variables check passed');

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body parsed successfully');
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, phone } = body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('❌ Validation failed: Password too short');
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    console.log('✅ Input validation passed');

    // Connect to database
    console.log('🔄 Attempting database connection...');
    try {
      await connectDB();
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError.message);
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if user already exists
    console.log('🔄 Checking if user exists...');
    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        console.log('❌ User already exists');
        return NextResponse.json(
          { success: false, error: 'User already exists with this email' },
          { status: 400 }
        );
      }
      console.log('✅ User does not exist, proceeding...');
    } catch (findError) {
      console.error('❌ Error checking existing user:', findError);
      return NextResponse.json(
        { success: false, error: 'Database query error' },
        { status: 500 }
      );
    }

    // Hash password
    console.log('🔄 Hashing password...');
    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
      console.log('✅ Password hashed successfully');
    } catch (hashError) {
      console.error('❌ Password hashing failed:', hashError);
      return NextResponse.json(
        { success: false, error: 'Password processing error' },
        { status: 500 }
      );
    }

    // Create user
    console.log('🔄 Creating new user...');
    let user;
    try {
      user = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone?.trim() || ''
      });

      await user.save();
      console.log('✅ User created successfully:', user._id);
    } catch (saveError) {
      console.error('❌ User creation failed:', saveError);
      
      // Handle specific MongoDB errors
      if (saveError.code === 11000) {
        return NextResponse.json(
          { success: false, error: 'Email already exists' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Generate JWT token
    console.log('🔄 Generating JWT token...');
    let token;
    try {
      token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      console.log('✅ JWT token generated successfully');
    } catch (tokenError) {
      console.error('❌ JWT token generation failed:', tokenError);
      return NextResponse.json(
        { success: false, error: 'Token generation error' },
        { status: 500 }
      );
    }

    // Return success response
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    };

    console.log('✅ Registration successful for:', user.email);
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('❌ Unexpected registration error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}