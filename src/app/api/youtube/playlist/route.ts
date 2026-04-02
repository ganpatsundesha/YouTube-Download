import { NextRequest, NextResponse } from 'next/server';
import { fetchPlaylistMetadata } from '@/lib/youtube/api';
import { extractPlaylistId } from '@/lib/youtube/parser';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    const playlistId = extractPlaylistId(url);

    if (!playlistId) {
      return NextResponse.json(
        { success: false, error: 'Invalid YouTube playlist URL' },
        { status: 400 }
      );
    }

    // Fetch playlist metadata
    const playlist = await fetchPlaylistMetadata(playlistId);

    if (!playlist) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch playlist metadata. Please ensure you have a YouTube API key configured.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: playlist,
      message: 'Playlist metadata fetched successfully',
    });
  } catch (error) {
    console.error('Playlist API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
