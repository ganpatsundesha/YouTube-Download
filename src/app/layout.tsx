import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = genMeta({
  title: 'TubeKit - YouTube Video Downloader, Subtitle Extractor & More',
  description: 'Download YouTube videos, extract subtitles, grab thumbnails, convert to MP3, and download Shorts - all free. The complete YouTube utility toolkit.',
  keywords: [
    'youtube downloader',
    'youtube video downloader',
    'download youtube videos',
    'youtube to mp3',
    'youtube playlist downloader',
    'youtube subtitle downloader',
    'youtube thumbnail downloader',
    'youtube shorts downloader',
    'extract youtube subtitles',
    'youtube converter',
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
      </body>
    </html>
  );
}
