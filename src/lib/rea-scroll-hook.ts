'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Hook adapted from REA's `website/public/assets/home.js`
 * Uses requestAnimationFrame to batch getBoundingClientRect() and avoid scroll jank.
 */
export function useReaScrollTracker(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || '');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePosition = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(scrollY / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);

      let current = sectionIds[0] || '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = id;
          }
        }
      }

      // Check bottom of page
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
        current = sectionIds[sectionIds.length - 1] || current;
      }

      setActiveId(current);
    };

    const schedulePosition = () => {
      if (scheduledRef.current) return;
      scheduledRef.current = true;
      window.requestAnimationFrame(() => {
        scheduledRef.current = false;
        updatePosition();
      });
    };

    window.addEventListener('scroll', schedulePosition, { passive: true });
    window.addEventListener('resize', schedulePosition, { passive: true });
    schedulePosition();

    return () => {
      window.removeEventListener('scroll', schedulePosition);
      window.removeEventListener('resize', schedulePosition);
    };
  }, [sectionIds, offset]);

  return { activeId, scrollProgress };
}
