// src/app/auth/login/page.js
"use client";
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <LoginForm />
      </div>
    </div>
  );
}