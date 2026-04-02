'use client';

import { Video, List, FileText, Image, Music, Zap } from 'lucide-react';
import { ToolType } from '@/types/youtube';
import { cn } from '@/lib/utils/cn';

interface ToolSelectorProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools: Array<{ type: ToolType; icon: any; label: string }> = [
  { type: 'video', icon: Video, label: 'Video' },
  { type: 'playlist', icon: List, label: 'Playlist' },
  { type: 'subtitle', icon: FileText, label: 'Subtitles' },
  { type: 'thumbnail', icon: Image, label: 'Thumbnail' },
  { type: 'mp3', icon: Music, label: 'MP3' },
  { type: 'shorts', icon: Zap, label: 'Shorts' },
];

export default function ToolSelector({ activeTool, onToolChange }: ToolSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tools.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onToolChange(type)}
            className={cn(
              'flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap',
              activeTool === type
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
