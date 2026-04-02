'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import HeroSection from '@/components/home/HeroSection';
import ToolSelector from '@/components/home/ToolSelector';
import URLInput from '@/components/home/URLInput';
import ResultsSection from '@/components/home/ResultsSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import HowItWorks from '@/components/home/HowItWorks';
import FAQSection from '@/components/home/FAQSection';
import SEOContent from '@/components/home/SEOContent';
import { ToolType } from '@/types/youtube';
import { extractVideoId, detectContentType } from '@/lib/youtube/parser';

export default function HomePage() {
  const [activeTool, setActiveTool] = useState<ToolType>('video');
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setResultData(null);

    try {
      // Detect content type from URL
      const contentType = detectContentType(url);
      
      // Auto-switch tool if needed
      if (contentType === 'playlist' && activeTool !== 'playlist') {
        setActiveTool('playlist');
      } else if (contentType === 'shorts' && activeTool !== 'shorts') {
        setActiveTool('shorts');
      }

      // Extract video ID
      const videoId = extractVideoId(url);
      
      if (!videoId) {
        toast.error('Invalid YouTube URL');
        setIsLoading(false);
        return;
      }

      // Fetch metadata based on tool type
      const endpoint = `/api/youtube/${activeTool}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, videoId }),
      });

      const data = await response.json();

      if (data.success) {
        setResultData(data.data);
        toast.success('Data fetched successfully!');
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        toast.error(data.error || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Tool Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ToolSelector activeTool={activeTool} onToolChange={setActiveTool} />
        <URLInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {/* Results Section */}
        <div id="results" className="mt-8">
          <ResultsSection
            toolType={activeTool}
            data={resultData}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQSection />

      {/* SEO Content */}
      <SEOContent />
    </>
  );
}
