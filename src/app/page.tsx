'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import CoreSolutions from '@/components/home/CoreSolutions';
import BrandPillars from '@/components/home/BrandPillars';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FounderSection from '@/components/home/FounderSection';
import ContactSection from '@/components/home/ContactSection';

// Dynamically import to avoid SSR — canvas API only available client-side
const CinematicIntro = dynamic(
  () => import('@/components/brand/CinematicIntro'),
  { ssr: false, loading: () => <div style={{ position:'fixed',inset:0,background:'#080608',zIndex:99999 }} /> }
);

// In dev: always show intro. In production: once per session.
const INTRO_SESSION_KEY = 'tfs_intro_v2';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);   // optimistic: show until we know
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Clear old key version
    sessionStorage.removeItem('tfs_intro_seen');

    const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
    if (seen) {
      // Already seen this session — skip immediately
      setShowIntro(false);
      setIntroComplete(true);
    }
    // else: keep showIntro=true, animation plays
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    setShowIntro(false);
    // Slight delay before fading in homepage so canvas teardown finishes
    setTimeout(() => setIntroComplete(true), 50);
  };

  const handleIntroSkip = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {showIntro && (
        <CinematicIntro
          onComplete={handleIntroComplete}
          onSkip={handleIntroSkip}
        />
      )}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Hero />
        <CoreSolutions />
        <BrandPillars />
        <FeaturedProducts />
        <FounderSection />
        <ContactSection />
      </div>
    </>
  );
}
