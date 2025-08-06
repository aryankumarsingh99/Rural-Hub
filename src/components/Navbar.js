// src/components/Navbar.js
"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            🌾 Rural Hub
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Services
            </Link>

            {/* Update this link to point to /dashboard */}
            {user && (
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
            
            {user && (
              <Link 
                href="/cart" 
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Cart
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  Welcome, {user.firstName}!
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login"
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}