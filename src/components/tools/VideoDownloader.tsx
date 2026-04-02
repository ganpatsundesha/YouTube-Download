'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Clock, Eye } from 'lucide-react';
import { YouTubeVideo } from '@/types/youtube';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface VideoDownloaderProps {
  video: YouTubeVideo;
}

export default function VideoDownloader({ video }: VideoDownloaderProps) {
  // Use the available qualities from the API, defaulting to '360p' if missing
  const rawQualities = video.availableQualities && video.availableQualities.length > 0
    ? video.availableQualities
    : ['720p', '480p', '360p', '240p', '144p']; // Safe fallback just in case
    
  const qualityOptions = rawQualities.map(q => ({
    value: q,
    label: q === '1080p' ? '1080p (Full HD)' : q === '720p' ? '720p (HD)' : q === '480p' ? '480p (SD)' : q
  }));
    
  const [quality, setQuality] = useState(qualityOptions[0].value);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    const downloadUrl = `/api/youtube/video?id=${encodeURIComponent(video.id)}&quality=${encodeURIComponent(quality)}`;
    
    // Explicitly open in a new browsing context to guarantee the Next.js App Router 
    // does not intercept the request and strip headers.
    // The new tab will immediately close itself once the attachment header is detected.
    window.open(downloadUrl, '_blank');
    
    // Reset the downloading state after a brief moment to show UI feedback
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Thumbnail */}
        <div className="md:col-span-1">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Video Info */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {video.title}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {video.duration}
            </span>
            {video.viewCount && (
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {video.viewCount}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-1">
            <strong>Channel:</strong> {video.channel}
          </p>

          {/* Quality Selector */}
          <div className="mt-4">
            <Select
              label="Select Quality"
              options={qualityOptions}
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            />
          </div>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            isLoading={isDownloading}
            fullWidth
            className="mt-4"
          >
            <Download className="h-5 w-5 mr-2" />
            Download MP4
          </Button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            ✓ Free • ✓ No watermark • ✓ High quality
          </p>
        </div>
      </div>
    </Card>
  );
}
