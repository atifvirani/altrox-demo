'use client';

import React from 'react';

interface TickerProps {
  items?: string[];
  speed?: 'normal' | 'fast';
  className?: string;
}

const DEFAULT_ITEMS = [
  'SPATIAL THREE.JS ARCHITECTURE',
  'HOLLYWOOD VFX & 3D CGI',
  'ALGORITHMIC SHORT-FORM NARRATIVE',
  'SUB-1.2S CORE WEB VITALS',
  'SWISS EDITORIAL TYPOGRAPHY',
  'REA BINARY & MCP ENGINE',
  '13 INTEGRATED CRAFTS',
  'SOUTH ASIA & GLOBAL REACH',
];

export default function Ticker({ items = DEFAULT_ITEMS, className = '' }: TickerProps) {
  // Duplicate for seamless loop
  const displayItems = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden border-y border-[#1C221D] bg-[#0A0D0B] py-3.5 select-none ${className}`}>
      <div className="flex w-max animate-ticker space-x-8">
        {displayItems.map((text, idx) => (
          <div key={idx} className="flex items-center space-x-6 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F2F2EC]">
              {text}
            </span>
            <span className="text-[#72977A] font-mono text-xs">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
