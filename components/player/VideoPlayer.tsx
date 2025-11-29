'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icon';
import { useHistoryStore } from '@/lib/store/history-store';
import { CustomVideoPlayer } from './CustomVideoPlayer';

interface VideoPlayerProps {
  playUrl: string;
  videoId?: string;
  currentEpisode: number;
  onBack: () => void;
}

export function VideoPlayer({ playUrl, videoId, currentEpisode, onBack }: VideoPlayerProps) {
  const [videoError, setVideoError] = useState<string>('');
  const [useProxy, setUseProxy] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_MANUAL_RETRIES = 20;

  // Use reactive hook to subscribe to history updates
  // This ensures the component re-renders when history is hydrated from localStorage
  const viewingHistory = useHistoryStore(state => state.viewingHistory);
  const searchParams = useSearchParams();
  const { addToHistory } = useHistoryStore();

  // Get video metadata from URL params
  const source = searchParams.get('source') || '';
  const title = searchParams.get('title') || '未知视频';

  // Get saved progress for this video
  const getSavedProgress = () => {
    if (!videoId) return 0;

    // Directly check HistoryStore for progress
    // We prioritize a strict match (including source), but fall back to any match for this video/episode
    // This fixes issues where the source parameter might be missing or different
    const historyItem = viewingHistory.find(item =>
      item.videoId.toString() === videoId?.toString() &&
      item.episodeIndex === currentEpisode &&
      (source ? item.source === source : true)
    ) || viewingHistory.find(item =>
      item.videoId.toString() === videoId?.toString() &&
      item.episodeIndex === currentEpisode
    );

    return historyItem ? historyItem.playbackPosition : 0;
  };

  // Handle time updates and save progress
  const handleTimeUpdate = (currentTime: number, duration: number) => {
    if (!videoId || !playUrl || duration === 0) return;

    // Save progress every few seconds
    if (currentTime > 1) {
      addToHistory(
        videoId,
        title,
        playUrl,
        currentEpisode,
        source,
        currentTime,
        duration,
        undefined,
        []
      );
    }
  };

  // Handle video errors
  const handleVideoError = (error: string) => {
    console.error('Video playback error:', error);

    // Auto-retry with proxy if not already using it
    if (!useProxy) {
      console.log('Attempting to retry with proxy...');
      setUseProxy(true);
      setShouldAutoPlay(true); // Force autoplay after proxy retry
      setVideoError('');
      return;
    }

    setVideoError(error);
  };

  const handleRetry = () => {
    if (retryCount >= MAX_MANUAL_RETRIES) return;

    setRetryCount(prev => prev + 1);
    setVideoError('');
    setShouldAutoPlay(true);
    // Toggle proxy to try different path, but since we are already in error state which likely means proxy failed (or direct failed),
    // we can try toggling or just force re-render.
    // Requirement says: "try without proxy and proxy and same as before"
    // We will just toggle useProxy state to force a refresh with/without proxy.
    // However, if we want to cycle, we can just toggle.
    // But the requirement says "proxy attempt count to 20".
    // So we just increment count and maybe toggle proxy or keep it.
    // Let's toggle it to give best chance.
    // Actually requirement says "try no proxy and proxy and same as before".
    // So simple toggle is fine.
    setUseProxy(prev => !prev);
  };

  const finalPlayUrl = useProxy
    ? `/api/proxy?url=${encodeURIComponent(playUrl)}&retry=${retryCount}` // Add retry param to force fresh request
    : playUrl;

  if (!playUrl) {
    return (
      <Card hover={false} className="p-0 overflow-hidden">
        <div className="aspect-video bg-[var(--glass-bg)] backdrop-blur-[25px] saturate-[180%] rounded-[var(--radius-2xl)] flex items-center justify-center border border-[var(--glass-border)]">
          <div className="text-center text-[var(--text-secondary)]">
            <Icons.TV size={64} className="text-[var(--text-color-secondary)] mx-auto mb-4" />
            <p>暂无播放源</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover={false} className="p-0 overflow-hidden">
      {videoError ? (
        <div className="aspect-video bg-black rounded-[var(--radius-2xl)] flex items-center justify-center">
          <div
            className="text-center text-white max-w-md px-4"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <Icons.AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <p className="text-lg font-semibold mb-2">播放失败</p>
            <p className="text-sm text-gray-300 mb-4">{videoError}</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button
                variant="secondary"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <Icons.ChevronLeft size={16} />
                <span>返回</span>
              </Button>
              {retryCount < MAX_MANUAL_RETRIES && (
                <Button
                  variant="primary"
                  onClick={handleRetry}
                  className="flex items-center gap-2"
                >
                  <Icons.RefreshCw size={16} />
                  <span>重试 ({retryCount}/{MAX_MANUAL_RETRIES})</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CustomVideoPlayer
          key={`${useProxy ? 'proxy' : 'direct'}-${retryCount}`} // Force remount when switching modes or retrying
          src={finalPlayUrl}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          initialTime={getSavedProgress()}
          shouldAutoPlay={shouldAutoPlay}
        />
      )}
    </Card>
  );
}
