import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noindex = false,
}: SEOProps): Metadata {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'TubeKit';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tubekit.com';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const image = ogImage || `${siteUrl}/og-image.png`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonical || siteUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function generateBlogPostMetadata({
  title,
  description,
  slug,
  publishedAt,
  author,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
  tags: string[];
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tubekit.com';
  const canonical = `${siteUrl}/blog/${slug}`;

  return {
    ...generateMetadata({
      title,
      description,
      keywords: tags,
      canonical,
    }),
    openGraph: {
      ...generateMetadata({ title, description, canonical }).openGraph,
      type: 'article',
      publishedTime: publishedAt,
      authors: [author],
      tags,
    },
  };
}
