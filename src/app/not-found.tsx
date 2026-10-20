import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-xs font-mono text-[#39FF78] uppercase tracking-widest">
          / 404 Transmission Void
        </div>
        <h1 className="text-6xl sm:text-8xl font-black font-editorial tracking-tighter text-[#F5F7F5]">
          404
        </h1>
        <p className="text-xs sm:text-sm text-[#A2AAA4] font-mono leading-relaxed">
          The requested coordinate does not exist in the ALTROX spatial architecture. It may have been relocated or archived.
        </p>
        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#111512] hover:bg-[#182119] border border-[#1A221C] text-[#F5F7F5] font-mono text-xs uppercase tracking-wider rounded transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#39FF78]" />
            <span>ALL SERVICES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
