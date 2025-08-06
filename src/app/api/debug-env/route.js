// src/app/api/debug-env/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envVars = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Found' : 'Missing',
      MONGODB_URI_LENGTH: process.env.MONGODB_URI?.length || 0,
      MONGODB_URI_PREVIEW: process.env.MONGODB_URI?.substring(0, 30) + '...' || 'N/A',
      JWT_SECRET: process.env.JWT_SECRET ? 'Found' : 'Missing',
      NODE_ENV: process.env.NODE_ENV,
      ALL_ENV_KEYS: Object.keys(process.env).filter(key => key.includes('MONGO'))
    };

    console.log('Environment Debug:', envVars);

    return NextResponse.json({
      success: true,
      environment: envVars,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}