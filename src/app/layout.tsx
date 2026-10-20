import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'ALTROX ® — Premium Creative Technology Studio & 3D Web Experience',
  description: 'An independent creative technology studio combining 3D WebGL architecture, cinematic VFX, viral short-form storytelling, and AI automation. Inspired by NK Studio & powered by REA.',
  keywords: [
    'ALTROX',
    'Creative Technology Studio',
    '3D Web Design',
    'Three.js WebGL',
    'VFX CGI',
    'Reels Editing',
    'South Asia Creative Tech',
    'AI Automation',
    'REA Agents',
    'Awwwards Studio',
  ],
  authors: [{ name: 'ALTROX Studio' }],
  creator: 'ALTROX Collective',
  publisher: 'ALTROX',
  metadataBase: new URL('https://altrox.studio'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://altrox.studio',
    title: 'ALTROX ® — Where Architecture Meets Cinematic Impact',
    description: 'Award-winning 3D web experiences, cinematic visual effects, viral short-form media, and enterprise AI automation.',
    siteName: 'ALTROX Studio',
    images: [
      {
        url: '/assets/hero-3d-monolith.jpg',
        width: 1200,
        height: 630,
        alt: 'ALTROX 3D Monolith Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALTROX ® — Creative Technology Studio',
    description: 'Award-winning 3D web experiences, cinematic VFX, viral Reels & AI automation.',
    images: ['/assets/hero-3d-monolith.jpg'],
    creator: '@altroxstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#090B09] text-[#F2F2EC] min-h-screen flex flex-col antialiased selection:bg-[#72977A] selection:text-[#090B09]">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
