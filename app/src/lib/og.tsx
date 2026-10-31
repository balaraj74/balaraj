import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200×630 share card. */
export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0c0a09 0%, #3e1206 100%)',
          color: '#faf7f2',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#f9853c', letterSpacing: 2, textTransform: 'uppercase' }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 58 : 72, fontWeight: 700, lineHeight: 1.12 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#a8a29e' }}>
          <span>Balaraj R · AI/ML Engineer</span>
          <span>balaraj.me</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
