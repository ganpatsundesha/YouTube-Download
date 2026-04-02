import Accordion from '@/components/ui/Accordion';
import { faqData } from '@/content/faq';

export default function FAQSection() {
  // Show first 6 FAQs on homepage
  const homepageFaqs = faqData.slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about TubeKit
          </p>
        </div>

        <Accordion items={homepageFaqs} />

        <div className="text-center mt-8">
          <a
            href="/faq"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all questions →
          </a>
        </div>
      </div>
    </section>
  );
}
