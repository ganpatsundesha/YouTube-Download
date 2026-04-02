import { Innertube, Platform } from 'youtubei.js';
import { YouTubeVideo, YouTubePlaylist, ThumbnailSize } from '@/types/youtube';
import { getYouTubeThumbnail } from './parser';
import vm from 'node:vm';

// Provide a custom JavaScript evaluator so youtubei.js can decipher streaming URLs.
// This is REQUIRED in environments where the default evaluator is not available or working.
Platform.shim.eval = (data: any, env: Record<string, any>) => {
  return vm.runInNewContext(data.code || '', env);
};

let innertubeInstance: Innertube | null = null;

async function getInnertube(): Promise<Innertube> {
  if (!innertubeInstance) {
    // Visitor Data and Cookie extracted from a real browser session to bypass bot detection.
    const visitor_data = 'CgsxSjcxUHdmM25qdyiLmrPOBjIKCgJJThIEGgAgQGLfAgrcAjE3LllUPWdKLTVnT1N4QVRnSjc0UXZzWm5MYUhWX1UzYl9OeTJmZkRWdHd6TjhqUk5ROWdTVlhnbmZHaVN4QnlDSWRVXzhfR1RQMnB2TndFSURQV3U1OG1Gb2s2elcxbDhPSUY1MlJlVU9YNDFLZjB2RTBKcDBQeFZvZVhISndtU3FBaUtEdDdkbTJiaE9jc0g2cUcxWUV5a3BuQW9Sck1zSU4tWmlDMEJpcl8tUTFsMzZvWmNpZGxVZklNZHV0RUcwVWlDUlN2NXp5RHhZYjltZW5XdDJMSjFiXzY4dWRFNlhkd0xYeWxPallhazRtdnlkaTU3SWl1V1p0TnFGYmsyb09XTjlZTzdqOTdMQUhHMzREOGhQNl9VOEpVN244dTY2MkV0UUpPV2dCZTZwdmtoM05RWnJKN0g5TkMxeXNFZUdvYTRUWE5iMVpFT2hiNDZIVl9LTS1UWFlzZw==';
    const cookie = '__Secure-1PSIDTS=sidts-CjUBBj1CYpi9L6Lmm2hHkB-jhGAqxfNTpFe8Y6N9UZatdfGMuYAfaIbbZSAImLFCB6A8V-d0ahAA; __Secure-3PSIDTS=sidts-CjUBBj1CYpi9L6Lmm2hHkB-jhGAqxfNTpFe8Y6N9UZatdfGMuYAfaIbbZSAImLFCB6A8V-d0ahAA; HSID=AyKz6Z7GL5SwtXw17; SSID=Az2ERNt3HfiLKmvXk; APISID=987Hb0_Lf2T_UizA/ASELgKH4gBuEpQYuF; SAPISID=cOXBrdpB0S09ikAp/AGwTE7p5mNm-Q9D-W; __Secure-1PAPISID=cOXBrdpB0S09ikAp/AGwTE7p5mNm-Q9D-W; __Secure-3PAPISID=cOXBrdpB0S09ikAp/AGwTE7p5mNm-Q9D-W; SID=g.a0008Ah4mdQ0g6qU-9_y55V-vQcMQ4h8dZm_fKiIfS3QqGDhhWK6iSCkuw2ynibzwkxBL67OXAACgYKATYSARASFQHGX2Mid2jBzpsoSctkBaM0hFYVjRoVAUF8yKrEdu_8ICM-StOYl7XmCQhF0076; __Secure-1PSID=g.a0008Ah4mdQ0g6qU-9_y55V-vQcMQ4h8dZm_fKiIfS3QqGDhhWK6xRa6zVqQ2C2jMHRrGxhhagACgYKAVcSARASFQHGX2MiOmJqy4MWOB5tejPsYgKFjxoVAUF8yKppKisRBTBIK-on6K-yVIjb0076; __Secure-3PSID=g.a0008Ah4mdQ0g6qU-9_y55V-vQcMQ4h8dZm_fKiIfS3QqGDhhWK6qd8JSSKWDLKw69jWe43t2QACgYKAa8SARASFQHGX2MiQuvoASGCP-oQK6lE2GCW1xoVAUF8yKrxmE_uGyQyuxET8axLBmof0076; YSC=QEl2ybloQSI; LOGIN_INFO=AFmmF2swRQIhAIbMBuqJ9jB_LrC0RuwpP374YzyFg6bwC6XgKm3HaEG1AiBMxjD3NgDms1X4a5qoTS2miJFKdKPBShZSd14tTbeAXA:QUQ3MjNmeFV0Y0c4X2xRMDRaeURvMkxFSkNxSVVmcEJjcVVVZ2w0RkVzeHZpM3gzNnA4TVNmWXlwdUkzdFEzSHJ6SkxHbmJaUVk1SC1zRTRaUVY5NTI1aEQ4OGJGSXZ6MmdqbFExT05SajA4U2t2cFBMcGV0N1VtLXR3MUtpUVRUN2lUaEs0ZnFnSzVTbG5CeEtPenBGc0dsVzdmYng1QmF3; VISITOR_INFO1_LIVE=1J71Pwf3njw; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgQA%3D%3D; wide=0';

    innertubeInstance = await Innertube.create({
      lang: 'en',
      location: 'US',
      retrieve_player: true,
      visitor_data: visitor_data,
      cookie: cookie
    });
  }
  return innertubeInstance;
}

export async function searchYouTube(query: string): Promise<YouTubeVideo[]> {
  const yt = await getInnertube();
  const search = await yt.search(query, { type: 'video' });
  
  return search.videos.map(video => {
    return {
      id: (video as any).id,
      title: (video as any).title.toString(),
      thumbnail: getYouTubeThumbnail((video as any).id, 'high'),
      duration: (video as any).duration.text || '0:00',
      viewCount: (video as any).view_count?.text || '0 views',
      channel: (video as any).author?.name || '',
      channelId: (video as any).author?.id || '',
      uploadDate: (video as any).published?.text || '',
    };
  });
}

export async function fetchVideoMetadata(id: string): Promise<YouTubeVideo | null> {
  try {
    const yt = await getInnertube();
    const video = await yt.getInfo(id);
    
    return {
      id: video.basic_info.id!,
      title: video.basic_info.title || '',
      thumbnail: getYouTubeThumbnail(video.basic_info.id!, 'maxres'),
      duration: video.basic_info.duration ? `${Math.floor(video.basic_info.duration / 60)}:${(video.basic_info.duration % 60).toString().padStart(2, '0')}` : '0:00',
      viewCount: video.basic_info.view_count ? `${video.basic_info.view_count.toLocaleString()} views` : '0 views',
      channel: video.basic_info.author || '',
      channelId: video.basic_info.channel_id || '',
      description: video.basic_info.short_description || '',
      uploadDate: '', 
      availableQualities: video.streaming_data?.adaptive_formats
        .filter(f => f.has_video)
        .map(f => f.quality_label)
        .filter((v, i, a) => {
          if (!v || a.indexOf(v) !== i) return false;
          // Parse the resolution height (e.g. "144p" -> 144, "1080p60" -> 1080)
          const height = parseInt(v.replace(/[^0-9]/g, '')) || 0;
          return height <= 1080;
        }) as string[] || [],
    };
  } catch (error) {
    console.error('fetchVideoMetadata error:', error);
    return null;
  }
}

export async function fetchPlaylistMetadata(id: string): Promise<YouTubePlaylist | null> {
  try {
    const yt = await getInnertube();
    const playlist = await yt.getPlaylist(id);
    
    return {
      id: (playlist as any).id || playlist.endpoint?.payload?.playlistId || '',
      title: (playlist as any).info?.title || 'Playlist',
      thumbnail: getYouTubeThumbnail((playlist as any).id || '', 'high'),
      channelTitle: (playlist as any).info?.author?.name || '',
      itemCount: playlist.videos.length,
      videos: playlist.videos.map(video => {
        const v = video as any;
        return {
          id: v.id || '',
          title: v.title?.toString() || '',
          thumbnail: getYouTubeThumbnail(v.id || '', 'high'),
          duration: v.duration?.text || '0:00',
          channel: v.author?.name || '',
          channelId: v.author?.id || '',
        };
      }),
    };
  } catch (error) {
    console.error('fetchPlaylistMetadata error:', error);
    return null;
  }
}

export function getThumbnailSizes(id: string): ThumbnailSize[] {
  const qualities: Array<'default' | 'medium' | 'high' | 'standard' | 'maxres'> = [
    'default', 'medium', 'high', 'standard', 'maxres'
  ];
  
  return qualities.map(quality => ({
    quality,
    url: getYouTubeThumbnail(id, quality),
    width: quality === 'maxres' ? 1280 : (quality === 'high' ? 480 : 320),
    height: quality === 'maxres' ? 720 : (quality === 'high' ? 360 : 180),
  }));
}

// Aliases for compatibility with newer code
export const getVideoDetails = fetchVideoMetadata;
export const getPlaylistVideos = async (id: string): Promise<YouTubeVideo[]> => {
  const playlist = await fetchPlaylistMetadata(id);
  return playlist?.videos || [];
};
