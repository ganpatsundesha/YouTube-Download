import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo/metadata';
import Card from '@/components/ui/Card';
import { FileText, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Blog - YouTube Tips, Tutorials & Guides',
  description: 'Learn how to download YouTube videos, extract subtitles, and get the most out of YouTube with our comprehensive guides and tutorials.',
  keywords: ['youtube tutorials', 'youtube downloader guide', 'how to download youtube videos', 'youtube tips'],
  canonical: '/blog',
});

// Sample blog posts - in production, fetch from CMS or markdown files
const blogPosts = [
  {
    slug: 'how-to-download-youtube-playlist',
    title: 'How to Download an Entire YouTube Playlist in 2024',
    description: 'Step-by-step guide to downloading complete YouTube playlists for offline viewing. Learn the best methods and tools.',
    category: 'Tutorials',
    publishedAt: '2024-03-15',
    readingTime: '5 min read',
  },
  {
    slug: 'extract-youtube-subtitles-guide',
    title: 'Complete Guide to Extracting YouTube Subtitles',
    description: 'Learn how to extract, download, and convert YouTube subtitles in multiple languages for translation and accessibility.',
    category: 'Guides',
    publishedAt: '2024-03-10',
    readingTime: '4 min read',
  },
  {
    slug: 'youtube-thumbnail-best-practices',
    title: 'YouTube Thumbnail Design: Best Practices for 2024',
    description: 'Discover how to create eye-catching YouTube thumbnails that boost click-through rates and grow your channel.',
    category: 'Tips',
    publishedAt: '2024-03-05',
    readingTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Blog & Tutorials
          </h1>
          <p className="text-xl text-gray-600">
            Tips, guides, and tutorials for getting the most out of YouTube
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readingTime}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  
                  <span className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State if no posts */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600">
              Check back soon for helpful tutorials and guides!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
