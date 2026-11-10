// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Function to check cookie
  const checkLogin = () => {
    const cookies = document.cookie;
    // Check karein ki 'teacherId' cookie maujood hai ya nahi
    if (cookies.includes('teacherId=')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
    // Har thori der baad ya focus par check karne ke liye
    window.addEventListener('focus', checkLogin);
    return () => window.removeEventListener('focus', checkLogin);
  }, []);

  const handleLogout = () => {
    // Cookie ko expire kar dein
    document.cookie = 'teacherId=; Max-Age=0; path=/;';
    setIsLoggedIn(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          IGS 🎓
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Home
          </Link>

          {/* Conditional Rendering: Login vs Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowLoginMenu(!showLoginMenu)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
              >
                Login ▾
              </button>

              {/* Dropdown Options */}
              {showLoginMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setShowLoginMenu(false);
                      router.push('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Login as Admin
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginMenu(false);
                      router.push('/teacher/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium border-t border-gray-100"
                  >
                    Login as Teacher
                  </button>
                  <button>Login as Student</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}