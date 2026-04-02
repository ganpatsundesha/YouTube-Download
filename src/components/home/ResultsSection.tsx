'use client';

import { YouTubeVideo } from '@/types/youtube';
import { ToolType } from '@/types/youtube';
import VideoDownloader from '@/components/tools/VideoDownloader';
import Card from '@/components/ui/Card';

interface ResultsSectionProps {
  toolType: ToolType;
  data: any;
  isLoading: boolean;
}

export default function ResultsSection({ toolType, data, isLoading }: ResultsSectionProps) {
  if (isLoading) {
    return (
      <Card className="text-center py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Fetching data...</p>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Render appropriate component based on tool type
  switch (toolType) {
    case 'video':
      return <VideoDownloader video={data} />;
    
    case 'playlist':
      return (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Playlist Results</h3>
          <p className="text-gray-600">Playlist downloader coming soon!</p>
        </Card>
      );
    
    case 'subtitle':
      return (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Subtitles</h3>
          <p className="text-gray-600">Subtitle extractor coming soon!</p>
        </Card>
      );
    
    case 'thumbnail':
      return (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Thumbnails</h3>
          <p className="text-gray-600">Thumbnail grabber coming soon!</p>
        </Card>
      );
    
    case 'mp3':
      return (
        <Card>
          <h3 className="text-xl font-semibold mb-4">MP3 Converter</h3>
          <p className="text-gray-600">MP3 converter coming soon!</p>
        </Card>
      );
    
    case 'shorts':
      return (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Shorts Downloader</h3>
          <p className="text-gray-600">Shorts downloader coming soon!</p>
        </Card>
      );
    
    default:
      return null;
  }
}
