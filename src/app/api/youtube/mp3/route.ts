import { NextRequest, NextResponse } from 'next/server';
import { fetchVideoMetadata } from '@/lib/youtube/api';
import { extractVideoId } from '@/lib/youtube/parser';

export async function POST(request: NextRequest) {
  try {
    const { url, videoId } = await request.json();

    if (!url && !videoId) {
      return NextResponse.json(
        { success: false, error: 'URL or video ID is required' },
        { status: 400 }
      );
    }

    const id = videoId || extractVideoId(url);

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Fetch video metadata
    const video = await fetchVideoMetadata(id);

    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch video metadata' },
        { status: 404 }
      );
    }

    // In production, integrate with audio extraction service
    // For now, return metadata with placeholder MP3 URL
    return NextResponse.json({
      success: true,
      data: {
        ...video,
        audioFormat: 'MP3',
        bitrate: '320kbps',
      },
      downloadUrl: `https://youtube.com/watch?v=${id}`, // Placeholder
      message: 'Ready for MP3 conversion',
    });
  } catch (error) {
    console.error('MP3 API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
