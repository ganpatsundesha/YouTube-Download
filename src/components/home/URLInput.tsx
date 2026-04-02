'use client';

import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { isYouTubeUrl } from '@/lib/youtube/parser';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function URLInput({ onSubmit, isLoading = false, placeholder }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder={placeholder || 'Paste YouTube URL here...'}
            error={error}
            className="text-lg"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="sm:w-auto w-full"
        >
          <Search className="h-5 w-5 mr-2" />
          Get Started
        </Button>
      </div>
    </form>
  );
}
