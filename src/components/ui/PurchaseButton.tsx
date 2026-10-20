'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

interface PurchaseButtonProps {
  title: string;
}

export default function PurchaseButton({ title }: PurchaseButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handlePurchase = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000);
  };

  return (
    <button
      onClick={handlePurchase}
      className="w-full py-4 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(57,255,120,0.3)]"
    >
      {downloaded ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-[#080A09]" />
          <span>DOWNLOADING ARCHIVE FOR {title.toUpperCase()}...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>PURCHASE & DOWNLOAD NOW</span>
        </>
      )}
    </button>
  );
}
