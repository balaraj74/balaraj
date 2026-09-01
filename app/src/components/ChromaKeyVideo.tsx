"use client";
import { useEffect, useRef } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** How far G must exceed max(R,B) to be keyed out. Default: 55. */
  threshold?: number;
  /** Feather zone size for soft edges. Default: 20. */
  feather?: number;
  /** Control audio mute from parent. Must start true for autoplay. */
  isMuted?: boolean;
  /** Volume 0–1. Default: 1. */
  volume?: number;
}

/**
 * Real-time chroma-key (green screen) video using a hidden <video> + <canvas>.
 * Each animation frame the canvas reads the video pixels, removes green-screen
 * pixels by setting their alpha to 0, and composites the result transparently.
 */
export default function ChromaKeyVideo({
  src,
  className,
  style,
  threshold = 55,
  feather = 20,
  isMuted = true,
  volume = 1,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  /* ── chroma key render loop ─────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    function onMetadata() {
      if (!video || !canvas) return;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 1080;
    }

    function processFrame() {
      if (video && canvas && ctx && video.readyState >= video.HAVE_CURRENT_DATA && canvas.width > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = frame.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const greenDelta = g - Math.max(r, b);
          if (greenDelta > threshold) {
            d[i + 3] = 0;
          } else if (greenDelta > threshold - feather) {
            const ratio = (greenDelta - (threshold - feather)) / feather;
            d[i + 3] = Math.round(d[i + 3] * (1 - ratio));
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      rafRef.current = requestAnimationFrame(processFrame);
    }

    video.addEventListener('loadedmetadata', onMetadata);
    if (video.videoWidth) onMetadata();
    video.play().catch(() => {});
    rafRef.current = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadedmetadata', onMetadata);
    };
  }, [src, threshold, feather]);

  /* ── sync muted / volume props → video element ───────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.volume = Math.max(0, Math.min(1, volume));
  }, [isMuted, volume]);

  return (
    <>
      {/* Hidden source video — feeds pixel data to the canvas */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted          /* always start muted for autoplay policy */
        playsInline
        className="hidden"
        crossOrigin="anonymous"
      />
      {/* Canvas renders the chroma-keyed frames */}
      <canvas ref={canvasRef} className={className} style={style} />
    </>
  );
}
