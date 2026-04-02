import { Video, List, FileText, Image, Music, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: Video,
    title: 'Video Downloader',
    description: 'Download YouTube videos in multiple quality options including 1080p, 720p, and 480p.',
  },
  {
    icon: List,
    title: 'Playlist Downloader',
    description: 'Save entire YouTube playlists with one click. Download all videos or select specific ones.',
  },
  {
    icon: FileText,
    title: 'Subtitle Extractor',
    description: 'Extract and download subtitles in multiple languages. Export as SRT, VTT, or TXT files.',
  },
  {
    icon: Image,
    title: 'Thumbnail Grabber',
    description: 'Download YouTube thumbnails in all available sizes, from standard to maximum resolution.',
  },
  {
    icon: Music,
    title: 'YouTube to MP3',
    description: 'Convert YouTube videos to high-quality MP3 audio files for offline listening.',
  },
  {
    icon: Zap,
    title: 'Shorts Downloader',
    description: 'Download YouTube Shorts videos quickly and easily in high quality.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            All-in-One YouTube Toolkit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Six powerful tools in one platform. Everything you need to work with YouTube content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
