'use client';

import ImageGenerator from './components/ImageGenerator';
import SignIn from './components/SignIn';
import { useAuth } from '@/lib/hooks/useAuth';
import Navigation from './components/Navigation';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent h-96 w-full"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Create{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                stunning images
              </span>
              <br />
              with AI
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
              Choose from multiple state-of-the-art AI models to bring your creative vision to life. 
              From quick sketches to professional illustrations, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none"></div>
        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : user ? (
            <ImageGenerator />
          ) : (
            <SignIn />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Built with Next.js and Replicate API
          </div>
        </div>
      </footer>
    </div>
  );
}
