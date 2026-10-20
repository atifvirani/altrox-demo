'use client';

import React from 'react';
import Link from 'next/link';

interface StudioCtaProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'underline';
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function StudioCta({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  external = false,
}: StudioCtaProps) {
  const content = (
    <span
      className="inline-flex items-center gap-2.5 translate-x-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[15px] motion-reduce:transition-none motion-reduce:transform-none"
    >
      {/* Studio Dual Underline */}
      <span className="studio-underline text-inherit uppercase tracking-widest text-[12px] font-medium">
        {children}
      </span>

      {/* nk.studio Sliding Double-Arrow Icon */}
      <span
        aria-hidden="true"
        className="relative inline-flex shrink-0 overflow-hidden size-[14px] items-center justify-center text-inherit"
      >
        {/* Outgoing primary arrow */}
        <span className="inline-flex items-center transition-transform duration-300 ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 12 12"
            className="size-[12px]"
          >
            <path
              fill="currentColor"
              d="M0 6.88V4.96h8.176l-3.984-3.6L5.536 0 11.2 5.28v1.265L5.536 11.84l-1.36-1.36 4-3.6z"
            />
          </svg>
        </span>
        {/* Incoming sliding duplicate arrow from left */}
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.18,1,.32,1)] -translate-x-full group-hover:translate-x-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 12 12"
            className="size-[12px]"
          >
            <path
              fill="currentColor"
              d="M0 6.88V4.96h8.176l-3.984-3.6L5.536 0 11.2 5.28v1.265L5.536 11.84l-1.36-1.36 4-3.6z"
            />
          </svg>
        </span>
      </span>
    </span>
  );

  const baseClasses =
    variant === 'primary'
      ? 'group inline-flex items-center justify-center px-6 py-3.5 bg-[#F2F2EC] text-[#090B09] rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 hover:bg-[#72977A] hover:text-[#090B09]'
      : variant === 'secondary'
      ? 'group inline-flex items-center justify-center px-6 py-3.5 bg-[#121613] text-[#F2F2EC] border border-[#1C221D] rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 hover:border-[#72977A] hover:text-[#72977A]'
      : 'group inline-flex items-center text-[#F2F2EC] py-2 transition-opacity duration-300 hover:opacity-100';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`} onClick={onClick}>
      {content}
    </Link>
  );
}
