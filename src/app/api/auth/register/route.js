// src/app/api/auth/register/route.js
import User from '@/models/User';
import connectDB from '@/lib/connectDB';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('🚀 Starting registration process...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Database connected');
    
    const { firstName, lastName, email, password, phone } = await request.json();
    console.log('📝 Form data received:', { firstName, lastName, email, phone });

    // Validation
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('❌ Validation failed: Password too short');
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('❌ User already exists');
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    console.log('👤 Creating new user...');
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
    });

    await newUser.save();
    console.log('✅ User created successfully');

    // Generate JWT token
    console.log('🎫 Generating JWT token...');
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    console.log('🎉 Registration successful');
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      token,
      user: userResponse
    }, { status: 201 });

  } catch (error) {
    console.error('💥 Registration error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}