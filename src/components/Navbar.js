// src/components/Navbar.js
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading } = useAuth();

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  // User/Admin menu items
  const userMenuItems = user ? [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Orders', href: '/orders' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ] : [];

  // Admin menu items (if user is admin)
  const adminMenuItems = user?.role === 'admin' ? [
    { name: 'Admin Panel', href: '/admin' },
    { name: 'Manage Users', href: '/admin/users' },
    { name: 'Manage Products', href: '/admin/products' },
    { name: 'Analytics', href: '/admin/analytics' },
  ] : [];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-green-600/95 backdrop-blur-sm shadow-lg' : 'bg-green-600'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-white text-2xl font-bold">
              🌾 Rural Hub
            </Link>
            <div className="text-white">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-green-600/95 backdrop-blur-sm shadow-lg' : 'bg-green-600 shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white text-2xl font-bold hover:text-green-200 transition-colors flex items-center space-x-2"
          >
            <span>🌾</span>
            <span>Rural Hub</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Main Navigation */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-green-200 transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-200 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-green-700 text-white placeholder-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 w-48"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-200 hover:text-white">
                🔍
              </button>
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative group">
                  {/* User Profile Dropdown */}
                  <button className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors">
                    <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                      {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span>Hello, {user.firstName}!</span>
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      
                      {/* User Menu Items */}
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                      
                      {/* Admin Menu Items */}
                      {adminMenuItems.length > 0 && (
                        <>
                          <div className="border-t border-gray-200 my-2"></div>
                          <div className="px-4 py-1">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</p>
                          </div>
                          {adminMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </>
                      )}
                      
                      {/* Logout */}
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-white hover:text-green-200 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors font-medium shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
              
              {/* Cart Icon (if user is logged in) */}
              {user && (
                <Link
                  href="/cart"
                  className="relative text-white hover:text-green-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l1.5 4.5m0 0h9m-9 0h9" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
              )}
              
              {/* Notifications (if user is logged in) */}
              {user && (
                <button className="relative text-white hover:text-green-200 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 3c4.97 0 9 4.03 9 9 0 1.31-.28 2.56-.78 3.69L12 3z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-green-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-green-500">
            {/* Mobile Search */}
            <div className="px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-green-700 text-white placeholder-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-200">
                  🔍
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white py-3 px-4 hover:bg-green-700 transition-colors"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t border-green-500">
              {user ? (
                <div>
                  {/* User Info */}
                  <div className="px-4 py-2 text-white">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                        {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-green-200">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile User Menu */}
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-white py-2 px-4 hover:bg-green-700 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Admin Menu */}
                  {adminMenuItems.length > 0 && (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-xs font-medium text-green-200 uppercase tracking-wider">Admin</p>
                      </div>
                      {adminMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-white py-2 px-4 hover:bg-green-700 transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                  
                  {/* Mobile Cart & Notifications */}
                  <div className="flex space-x-4 px-4 py-3">
                    <Link
                      href="/cart"
                      className="flex items-center space-x-2 text-white hover:text-green-200"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l1.5 4.5m0 0h9m-9 0h9" />
                      </svg>
                      <span>Cart (3)</span>
                    </Link>
                    <button className="flex items-center space-x-2 text-white hover:text-green-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 3c4.97 0 9 4.03 9 9 0 1.31-.28 2.56-.78 3.69L12 3z" />
                      </svg>
                      <span>Notifications (2)</span>
                    </button>
                  </div>
                  
                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white py-3 px-4 hover:bg-red-600 transition-colors border-t border-green-500 mt-2"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <Link
                    href="/login"
                    className="block text-white py-3 hover:bg-green-700 transition-colors rounded"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-green-700 text-white py-3 px-4 rounded hover:bg-green-800 transition-colors text-center"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}