'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = useCallback(() => {
    setIsNavigating(true);
    setProgress(0);

    // Clear any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Animate progress from 0 to ~90% over time
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 90) {
        currentProgress = 90;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      setProgress(currentProgress);
    }, 200);
  }, []);

  const completeProgress = useCallback(() => {
    // Clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Complete to 100%
    setProgress(100);

    // Hide after animation
    timeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    // On pathname or searchParams change, complete the progress
    completeProgress();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pathname, searchParams, completeProgress]);

  // Listen for navigation start via custom event
  useEffect(() => {
    const handleStart = () => startProgress();
    
    window.addEventListener('navigation-start', handleStart);
    return () => window.removeEventListener('navigation-start', handleStart);
  }, [startProgress]);

  if (!isNavigating && progress === 0) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-kaduna-emerald via-kaduna-gold to-kaduna-emerald transition-all duration-300 ease-out shadow-sm shadow-kaduna-emerald/50"
        style={{ 
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
      {/* Glow effect at the leading edge */}
      {isNavigating && progress < 100 && (
        <div 
          className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent to-kaduna-emerald/30 animate-pulse"
          style={{ left: `${Math.max(0, progress - 10)}%` }}
        />
      )}
    </div>
  );
}

// Helper function to trigger navigation start event
export function triggerNavigationStart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('navigation-start'));
  }
}

