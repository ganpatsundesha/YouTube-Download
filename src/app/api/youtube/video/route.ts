import { NextRequest, NextResponse } from 'next/server';
import { fetchVideoMetadata } from '@/lib/youtube/api';
import { create } from 'youtube-dl-exec';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { pipeline } from 'stream/promises';
import { Readable, PassThrough } from 'stream';

// Safely construct the path to yt-dlp binary
const getYtDlpPath = () => {
  const isWin = os.platform() === 'win32';
  if (isWin) {
    return path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
  }
  return path.join(process.cwd(), 'bin', 'yt-dlp_linux');
};

// Safely construct the path to ffmpeg binary
const getFfmpegPath = () => {
  const isWin = os.platform() === 'win32';
  const binaryName = isWin ? 'ffmpeg.exe' : 'ffmpeg';
  return path.join(process.cwd(), 'node_modules', 'ffmpeg-static', binaryName);
};

const youtubedl = create(getYtDlpPath());

// Configure FFmpeg
ffmpeg.setFfmpegPath(getFfmpegPath());

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const quality = searchParams.get('quality') || '360p';

    if (!id) {
      return NextResponse.json({ success: false, error: 'Video ID is required' }, { status: 400 });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${id}`;
    
    console.log(`[Download] Fetching info from yt-dlp to fix video download formats for ${quality}...`);
    // Pass headers or configs to yt-dlp to emulate standard browsers, use IOS/Android clients to bypass Bot detection
    const info = await youtubedl(videoUrl, { 
      dumpJson: true, 
      noWarnings: true,
      'extractor-args': 'youtube:player_client=ios,web,default' // fix PO Token/Bot error for youtube
    } as any) as any;
    const safeTitle = (info.title || 'video').replace(/[^a-zA-Z0-9\s\-_]/g, '').trim();

    // 2. Discover the exact requested format, clamped to 1080p max
    const rawResHeight = quality === '4k' ? 2160 : parseInt(quality.replace('p', '')) || 360;
    const resHeight = Math.min(rawResHeight, 1080);
    
    // Sort formats to match the best
    const formats = info.formats || [];
    
    // Progressive: has both vcodec != 'none' and acodec != 'none'
    const progressive = formats.filter((f: any) => f.vcodec !== 'none' && f.acodec !== 'none' && (f.height === resHeight || f.height <= resHeight));
    progressive.sort((a: any, b: any) => (b.height || 0) - (a.height || 0));
    
    const isAdaptive = progressive.length === 0 || progressive[0].height < resHeight - 100;

    const headers = new Headers();
    headers.set('Content-Type', 'video/mp4');
    const encodedFilename = encodeURIComponent(`${safeTitle}-${quality}.mp4`);
    headers.set(
      'Content-Disposition', 
      `attachment; filename="video.mp4"; filename*=UTF-8''${encodedFilename}`
    );
    headers.set('Cache-Control', 'no-store');

    const fetchStream = async (url: string) => {
      const resp = await fetch(url, { headers: info.http_headers as any });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.body;
    };

    // 3A. Simple Progressive Stream (No FFmpeg Needed)
    if (!isAdaptive && progressive.length > 0) {
      const fmt = progressive[0];
      console.log(`[Download] Streaming progressive ${fmt.format_id} directly...`);
      const stream = await fetchStream(fmt.url!);
      if (fmt.filesize) headers.set('Content-Length', fmt.filesize.toString());
      
      return new NextResponse(stream as any, { status: 200, headers });
    }

    // 3B. Adaptive Merging Stream (FFmpeg Required)
    console.log(`[Download] Format ${quality} is adaptive! Merging video + audio directly via FFmpeg...`);
    
    // Convert 1080p -> 1080
    // Quality already parsed to resHeight above
    // Formats already extracted above
    const videoFormats = formats.filter((f: any) => f.vcodec !== 'none' && f.acodec === 'none' && f.height && f.height <= resHeight);
    videoFormats.sort((a: any, b: any) => (b.height || 0) - (a.height || 0));
    const audioFormats = formats.filter((f: any) => f.acodec !== 'none' && f.vcodec === 'none');
    
    const vFmt = videoFormats.length > 0 ? videoFormats[0] : null;
    const aFmt = audioFormats.length > 0 ? audioFormats.pop() : null; // best audio usually last
    
    const resolveUrl = (fmt: any) => fmt ? (fmt.url || fmt.manifest_url || fmt.fragment_base_url) : null;
    const vUrl = resolveUrl(vFmt);
    const aUrl = resolveUrl(aFmt);
    
    if (!vUrl || !aUrl) {
       return NextResponse.json({ success: false, error: `Format ${quality} not available or formats missing url.` }, { status: 404 });
    }

    const passThrough = new PassThrough();

    const userAgent = (info.http_headers as any)?.['User-Agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    const headerStr = `User-Agent: ${userAgent}\r\n`;

    ffmpeg()
      .input(vUrl)
      .inputOptions(['-headers', headerStr])
      .input(aUrl)
      .inputOptions(['-headers', headerStr])
      .outputOptions(['-c:v copy', '-c:a aac', '-movflags frag_keyframe+empty_moov'])
      .format('mp4')
      .on('end', () => {
        console.log(`[Download] FFmpeg native merge stream completed for ${quality}`);
      })
      .on('error', (err) => {
        console.error('[Download] FFmpeg native error:', err);
        passThrough.destroy(err);
      })
      .pipe(passThrough);

    const webStream = new ReadableStream({
      start(controller) {
        passThrough.on('data', chunk => controller.enqueue(chunk));
        passThrough.on('end', () => controller.close());
        passThrough.on('error', err => controller.error(err));
      },
      cancel() {
        passThrough.destroy();
      }
    });

    return new NextResponse(webStream, { status: 200, headers });
  } catch (error: any) {
    console.error('[Download] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Download failed: ' + (error.message || String(error)) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();

    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const videoData = await fetchVideoMetadata(videoId);

    if (!videoData) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch video details' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: videoData,
    });
  } catch (error: any) {
    console.error('Video API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
