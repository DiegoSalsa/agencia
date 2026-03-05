'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCounterOptions {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  threshold?: number;
}

export function useCounter({ target, prefix = '', suffix = '', duration = 2000, threshold = 0.5 }: UseCounterOptions) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const startTime = performance.now();

        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);

          setDisplay(`${prefix}${current}${target === 150 ? '+' : ''}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            setDisplay(`${prefix}${target}${target === 150 ? '+' : ''}${suffix}`);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, duration, threshold]);

  return { ref, display };
}
