'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * useTransparentLogo
 * ──────────────────
 * Loads a PNG that has a dark/black baked-in background, draws it to an
 * offscreen canvas, reads every pixel and sets any pixel whose perceived
 * brightness is below `threshold` to fully transparent.
 *
 * Returns a data-URL string ready to use as an <img src> or CSS background.
 * Returns null while loading or if canvas is not available.
 *
 * @param src       - path to the logo PNG (e.g. '/brand/trinetra-logo.png')
 * @param threshold - brightness (0–255) below which pixels become transparent
 *                    default 30 is aggressive enough to remove black without
 *                    clipping gold/red/white logo pixels
 */
export function useTransparentLogo(
  src: string,
  threshold = 30
): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const cachedRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Return cached result immediately
    if (cachedRef.current[src]) {
      setDataUrl(cachedRef.current[src]);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Perceived brightness — standard luminance formula
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          if (brightness < threshold) {
            // Make pixel fully transparent
            data[i + 3] = 0;
          } else if (brightness < threshold * 2.5) {
            // Soft anti-aliased edge: partial transparency
            const alpha = Math.floor(
              255 * ((brightness - threshold) / (threshold * 1.5))
            );
            data[i + 3] = Math.min(data[i + 3], alpha);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL('image/png');
        cachedRef.current[src] = url;
        setDataUrl(url);
      } catch (e) {
        // Cross-origin or canvas tainted — fall back to mix-blend-mode
        console.warn('useTransparentLogo: canvas tainted, using original', e);
        setDataUrl(src);
      }
    };

    img.onerror = () => {
      // Image failed to load — use original
      setDataUrl(src);
    };

    img.src = src;
  }, [src, threshold]);

  return dataUrl;
}
