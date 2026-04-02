import { NextRequest, NextResponse } from 'next/server';
import { getThumbnailSizes } from '@/lib/youtube/api';
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

    // Get all thumbnail sizes
    const thumbnails = getThumbnailSizes(id);

    return NextResponse.json({
      success: true,
      data: {
        videoId: id,
        thumbnails,
      },
      message: 'Thumbnails fetched successfully',
    });
  } catch (error) {
    console.error('Thumbnail API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
