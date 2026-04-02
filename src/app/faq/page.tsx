import { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';
import { faqData } from '@/content/faq';
import { generateMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema } from '@/lib/seo/schema';

export const metadata: Metadata = generateMetadata({
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions about TubeKit - YouTube downloader, subtitle extractor, and more. Learn how to download videos, extract subtitles, and use our tools.',
  keywords: ['tubekit faq', 'youtube downloader questions', 'how to download youtube videos', 'youtube subtitle extractor help'],
  canonical: '/faq',
});

export default function FAQPage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData)),
        }}
      />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about TubeKit
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion items={faqData} />

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please reach out to our support team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
