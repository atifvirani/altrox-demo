'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface ParallaxMediaProps {
  src: string;
  poster?: string;
  alt?: string;
  type?: 'image' | 'video';
  parallaxSpeed?: number; // e.g. 0.12 or -0.12
  aspectRatio?: string; // e.g. "aspect-[16/10]" or "aspect-[4/3]"
  className?: string;
  filterMode?: 'cinematic' | 'mono' | 'editorial' | 'none';
  showControls?: boolean;
  scanlines?: boolean;
}

export default function ParallaxMedia({
  src,
  poster,
  alt = 'ALTROX Studio Media',
  type,
  parallaxSpeed = 0.14,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  filterMode = 'cinematic',
  showControls = false,
  scanlines = false,
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement & HTMLImageElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'cinematic' | 'mono' | 'editorial' | 'none'>(filterMode);

  // Inferred type
  const isVideo = type === 'video' || src.match(/\.(mp4|webm|mov|ogg)(\?|$)/i) !== null;

  useEffect(() => {
    let animationFrameId: number;
    let isSubscribed = true;

    const updateParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if container is in or near viewport
      if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
        // Center offset relative to viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = (elementCenter - viewportCenter) * parallaxSpeed;
        setOffsetY(delta);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [parallaxSpeed]);

  // Video Intersection Observer to pause off-screen video
  useEffect(() => {
    if (!isVideo || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (mediaRef.current) {
            if (entry.isIntersecting) {
              mediaRef.current.play().catch(() => {});
              setIsPlaying(true);
            } else {
              mediaRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVideo]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      } else {
        mediaRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const getFilterClass = () => {
    switch (activeFilter) {
      case 'cinematic':
        return 'video-filter-cinematic';
      case 'mono':
        return 'video-filter-mono';
      case 'editorial':
        return 'video-filter-warm-editorial';
      default:
        return '';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`group/media relative overflow-hidden rounded-xl border border-[#1C221D] bg-[#0E120F] mask-vertical-fade ${aspectRatio} ${className}`}
    >
      {/* Parallax Media Stage */}
      <div
        className="absolute inset-0 size-full will-change-transform transition-transform ease-out duration-100"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.14)`,
        }}
      >
        {isVideo ? (
          <video
            ref={mediaRef as unknown as React.RefObject<HTMLVideoElement>}
            src={src}
            poster={poster}
            muted={isMuted}
            loop
            playsInline
            autoPlay
            preload="metadata"
            className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(.18,1,.32,1)] group-hover/media:scale-[1.02] ${getFilterClass()}`}
          />
        ) : (
          <img
            ref={mediaRef as unknown as React.RefObject<HTMLImageElement>}
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(.18,1,.32,1)] group-hover/media:scale-[1.03] ${getFilterClass()}`}
          />
        )}
      </div>

      {/* Optional nk.studio Scanlines & Grain */}
      {scanlines && (
        <div className="pointer-events-none absolute inset-0 z-10 video-scanlines opacity-40 mix-blend-overlay" />
      )}
      <div className="pointer-events-none absolute inset-0 z-10 film-grain-overlay opacity-30 mix-blend-screen" />

      {/* Subtle Bottom Ambient Gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#090B09]/80 via-transparent to-transparent" />

      {/* Video Chrome / Control Overlay */}
      {isVideo && showControls && (
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 opacity-80 group-hover/media:opacity-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-[#72977A] hover:text-[#090B09] transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              className="p-1.5 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-[#72977A] hover:text-[#090B09] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <span className="text-[10px] uppercase font-mono tracking-wider text-[#92968F] ml-1">
              {isVideo ? 'REC • 24 FPS' : 'STATIC CAPTURE'}
            </span>
          </div>

          {/* Interactive filter toggle pills */}
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-0.5 rounded-full border border-white/10 text-[9px] font-mono">
            {(['cinematic', 'mono', 'editorial'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFilter(mode);
                }}
                className={`px-2 py-0.5 rounded-full transition-colors capitalize ${
                  activeFilter === mode
                    ? 'bg-[#72977A] text-[#090B09] font-bold'
                    : 'text-[#92968F] hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
