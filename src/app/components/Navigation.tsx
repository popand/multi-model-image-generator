'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 rounded-xl opacity-20 animate-pulse"></div>
                <svg
                  className="w-8 h-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="14"
                    cy="8"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-indigo-500"
                  />
                  <path
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-purple-600"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Img Cursor
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/my-images"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  My Images
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  Sign in to start
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                Powered by Replicate
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 