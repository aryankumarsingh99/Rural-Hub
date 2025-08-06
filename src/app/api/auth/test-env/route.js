// src/app/api/test-env/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    MONGODB_URI: !!process.env.MONGODB_URI,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
  };

  console.log('Environment variables status:', envVars);

  return NextResponse.json({
    success: true,
    environmentVariables: envVars,
    nodeEnv: process.env.NODE_ENV
  });
}