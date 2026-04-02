import { Clipboard, Settings, Download } from 'lucide-react';

const steps = [
  {
    icon: Clipboard,
    title: 'Paste URL',
    description: 'Copy and paste any YouTube video, playlist, or Shorts URL into the input box.',
  },
  {
    icon: Settings,
    title: 'Choose Format',
    description: 'Select your preferred quality, format, or tool option from the available choices.',
  },
  {
    icon: Download,
    title: 'Download',
    description: 'Click download and save your content. Fast, simple, and completely free.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Download YouTube content in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full mb-3">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
