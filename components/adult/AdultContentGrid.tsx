'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Card } from '@/components/ui/Card';

interface AdultVideo {
    vod_id: string | number;
    vod_name: string;
    vod_pic?: string;
    vod_remarks?: string;
    type_name?: string;
    source: string;
}

interface AdultContentGridProps {
    videos: AdultVideo[];
    loading: boolean;
    hasMore: boolean;
    onVideoClick?: (video: AdultVideo) => void;
    prefetchRef: React.RefObject<HTMLDivElement | null>;
    loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export function AdultContentGrid({
    videos,
    loading,
    hasMore,
    onVideoClick,
    prefetchRef,
    loadMoreRef,
}: AdultContentGridProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {videos.map((video) => (
                    <div
                        key={`${video.source}-${video.vod_id}`}
                        className="group cursor-pointer"
                        onClick={() => onVideoClick?.(video)}
                        style={{
                            contain: 'layout style paint',
                            contentVisibility: 'auto'
                        }}
                    >
                        <Card hover className="overflow-hidden p-0 h-full" blur={false}>
                            <div className="relative aspect-[2/3] overflow-hidden bg-[var(--glass-bg)]">
                                {video.vod_pic ? (
                                    <Image
                                        src={video.vod_pic}
                                        alt={video.vod_name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="eager"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[var(--text-color-secondary)]">
                                        无封面
                                    </div>
                                )}
                                {video.vod_remarks && (
                                    <div className="absolute top-2 right-2 bg-black/80 px-2.5 py-1.5 flex items-center gap-1.5 rounded-[var(--radius-full)]">
                                        <span className="text-xs font-bold text-white">
                                            {video.vod_remarks}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-sm text-[var(--text-color)] line-clamp-2 group-hover:text-[var(--accent-color)] transition-colors">
                                    {video.vod_name}
                                </h3>
                                {video.type_name && (
                                    <p className="text-xs text-[var(--text-color-secondary)] mt-1">
                                        {video.type_name}
                                    </p>
                                )}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Prefetch Trigger */}
            {hasMore && !loading && <div ref={prefetchRef} className="h-1" />}

            {/* Loading Indicator */}
            {loading && (
                <div className="flex justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-color)] border-t-transparent"></div>
                        <p className="text-sm text-[var(--text-color-secondary)]">加载中...</p>
                    </div>
                </div>
            )}

            {/* Intersection Observer Target */}
            {hasMore && !loading && <div ref={loadMoreRef} className="h-20" />}

            {/* No More Content */}
            {!loading && !hasMore && videos.length > 0 && (
                <div className="text-center py-12">
                    <p className="text-[var(--text-color-secondary)]">没有更多内容了</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && videos.length === 0 && (
                <div className="text-center py-20">
                    <div className="flex justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[var(--text-color-secondary)]"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 3v18" />
                            <path d="M3 7.5h4" />
                            <path d="M3 12h18" />
                            <path d="M3 16.5h4" />
                            <path d="M17 3v18" />
                            <path d="M17 7.5h4" />
                            <path d="M17 16.5h4" />
                        </svg>
                    </div>
                    <p className="text-[var(--text-color-secondary)]">暂无内容</p>
                </div>
            )}
        </div>
    );
}
