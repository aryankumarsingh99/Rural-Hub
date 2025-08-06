// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export async function POST(request) {
  try {
    console.log('🔄 Registration request received');
    
    // Parse request body
    const body = await request.json();
    console.log('📝 Request body received:', { ...body, password: '[HIDDEN]' });
    
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

    // Connect to database
    console.log('🔄 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully');

    // Check if user already exists
    console.log('🔄 Checking if user exists...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ User already exists');
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('🔄 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('✅ Password hashed successfully');

    // Create user
    console.log('🔄 Creating new user...');
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone?.trim() || ''
    });

    await user.save();
    console.log('✅ User created successfully:', user._id);

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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
    console.error('❌ Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors)[0]?.message || 'Validation error';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}