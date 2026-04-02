'use client';

import { Download, Shield, Zap, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Download YouTube Videos, Extract Subtitles & More
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The complete YouTube toolkit. Download videos, playlists, subtitles, thumbnails, convert to MP3, and save Shorts - all in one place.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 text-gray-700">
            <Zap className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Shield className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium">100% Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Download className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium">No Signup Required</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Users className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium">Trusted by 2M+ Users</span>
          </div>
        </div>
      </div>
    </section>
  );
}
