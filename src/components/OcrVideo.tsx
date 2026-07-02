"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted, looping demo clip that respects prefers-reduced-motion:
 * it only starts playback when the user has not asked to reduce motion.
 * Controls are always available so a paused clip is still watchable.
 */
export function OcrVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = window.matchMedia;
    const reduce = mm ? mm("(prefers-reduced-motion: reduce)").matches : false;
    if (!reduce) {
      const played = el.play();
      if (played && typeof played.catch === "function") {
        played.catch(() => {});
      }
    }
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={label}
      className="block w-full"
    />
  );
}
