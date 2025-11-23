import { useEffect } from 'react';

interface UsePlaybackPollingProps {
    isPlaying: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isDraggingProgressRef: React.MutableRefObject<boolean>;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
}

/**
 * Polling fallback for AirPlay and throttled events
 * Updates playback progress manually when events are suppressed
 */
export function usePlaybackPolling({
    isPlaying,
    videoRef,
    isDraggingProgressRef,
    setCurrentTime,
    setDuration
}: UsePlaybackPollingProps) {
    useEffect(() => {
        if (!isPlaying || !videoRef.current) return;

        const interval = setInterval(() => {
            if (videoRef.current && !isDraggingProgressRef.current) {
                const current = videoRef.current.currentTime;
                const total = videoRef.current.duration;

                // Only update if significantly different to avoid jitter
                setCurrentTime(current);
                if (!isNaN(total) && total > 0) {
                    setDuration(total);
                }
            }
        }, 500); // Poll every 500ms

        return () => clearInterval(interval);
    }, [isPlaying, videoRef, isDraggingProgressRef, setCurrentTime, setDuration]);
}
