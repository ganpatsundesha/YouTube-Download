export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Check if it's just the video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}

export function extractPlaylistId(url: string): string | null {
  const patterns = [
    /[?&]list=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
}

export function isPlaylistUrl(url: string): boolean {
  return /[?&]list=/.test(url) || /youtube\.com\/playlist/.test(url);
}

export function isShortsUrl(url: string): boolean {
  return /youtube\.com\/shorts\//.test(url);
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' | 'standard' = 'maxres'): string {
  const qualityMap: Record<string, string> = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    standard: 'sddefault',
    maxres: 'maxresdefault',
  };
  
  return `https://i.ytimg.com/vi/${videoId}/${qualityMap[quality] || 'default'}.jpg`;
}

export function detectContentType(url: string): 'video' | 'playlist' | 'shorts' | 'unknown' {
  if (isShortsUrl(url)) return 'shorts';
  if (isPlaylistUrl(url)) return 'playlist';
  if (extractVideoId(url)) return 'video';
  return 'unknown';
}
