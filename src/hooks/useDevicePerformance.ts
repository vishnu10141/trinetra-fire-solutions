'use client';
import { useEffect, useState } from 'react';
import type { PerformanceTier } from '@/types';

export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setTier('low'); return; }

    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;

    if (memory !== undefined && memory <= 2) { setTier('low'); return; }
    if (isMobile || isSmallScreen) { setTier(cores && cores <= 4 ? 'low' : 'medium'); return; }
    if (memory !== undefined && memory <= 4) { setTier('medium'); return; }
    setTier('high');
  }, []);

  return tier;
}
