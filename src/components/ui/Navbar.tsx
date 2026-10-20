'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal } from 'lucide-react';
import StudioCta from '@/components/ui/StudioCta';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
  { href: '/content', label: 'Content' },
  { href: '/learning', label: 'Learning' },
  { href: '/store', label: 'Store' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  const [navThreshold, setNavThreshold] = useState(1800);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNavThreshold(window.innerHeight * 2.1);
    }
  }, []);

  const hideNavbarLogoOnHome = isHome && !reducedMotion && scrollY < navThreshold;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(.18,1,.32,1)] ${
          isScrolled
            ? 'bg-[#090B09]/92 backdrop-blur-[20px] border-b border-[#1C221D] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with nk.studio Clip-Path Reveal */}
          <Link
            href="/"
            aria-label="ALTROX Home"
            className="group flex items-center space-x-1.5 focus:outline-none"
          >
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tighter text-[#72977A] transition-transform duration-300 group-hover:scale-105">
              /
            </span>
            <div
              id="nav-logo-slot"
              className={`relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(.18,1,.32,1)] ${
                hideNavbarLogoOnHome ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {/* nk.studio Split Reveal: "AL" glyph expands to "ALTROX" on hover */}
              <div className="flex items-center">
                <span className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[#F2F2EC] group-hover:text-white transition-colors duration-300">
                  ALTROX
                </span>
                <span className="text-[10px] font-mono text-[#92968F] uppercase tracking-widest pl-1">
                  ®
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links with nk.studio Studio-Underline Split */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-wider uppercase">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 group ${
                    isActive ? 'text-[#72977A] font-bold' : 'text-[#92968F] hover:text-[#F2F2EC]'
                  }`}
                >
                  <span className="studio-underline">{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#72977A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/#rea-lab"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-[#121613] hover:bg-[#1A221C] text-[#92968F] hover:text-[#72977A] border border-[#1C221D] rounded-full text-xs font-mono transition-all duration-300"
            >
              <Terminal className="w-3.5 h-3.5 text-[#72977A]" />
              <span>REA LAB</span>
            </Link>

            {/* nk.studio Kinetic Arrow CTA */}
            <StudioCta href="/contact" variant="primary">
              LET’S TALK
            </StudioCta>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#92968F] hover:text-[#F2F2EC] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090B09] pt-24 px-6 flex flex-col justify-between pb-8 md:hidden animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="text-[11px] font-mono text-[#92968F] uppercase tracking-widest border-b border-[#1C221D] pb-2">
              Menu Navigation
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-black tracking-tight text-[#F2F2EC] hover:text-[#72977A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#rea-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-sm font-mono text-[#72977A] pt-2"
            >
              <Terminal className="w-4 h-4" />
              <span>REA Tech Lab & MCP Engine</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-mono text-[#92968F] hover:text-[#F2F2EC]"
            >
              Control Room CMS (/admin)
            </Link>
          </div>

          <div className="pt-8 border-t border-[#1C221D]">
            <StudioCta
              href="/contact"
              variant="primary"
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              LET’S TALK
            </StudioCta>
            <div className="mt-4 text-center font-mono text-[11px] text-[#92968F]">
              New Delhi · Mumbai · Dhaka · Kathmandu
            </div>
          </div>
        </div>
      )}
    </>
  );
}
