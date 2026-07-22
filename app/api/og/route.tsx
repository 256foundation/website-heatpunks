import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { pages, archiveOg, type PageOg } from '@/data/pages';

// Node.js (default) runtime, not edge: the bundled JetBrains Mono fonts push
// this route past Vercel's 1 MB Edge Function size limit. Node's serverless
// function size limit is far larger, and next/og's ImageResponse has
// supported the Node.js runtime since Next 14.

// Brand palette (mirrors app/globals.css)
const FLAME = '#ff6b00';
const RED = '#ff3d00';
const FLAME_LIGHT = '#ff8c33';
const GREEN = '#00ff41';
const YELLOW = '#f9ed32';
const WHITE = '#f5f5f5';
const MUTED = '#888888';
const FLAME_GRADIENT = `linear-gradient(135deg, ${FLAME} 0%, ${RED} 50%, ${FLAME_LIGHT} 100%)`;

// Bundled assets, read once per warm serverless instance (not per request).
// Next.js's build-time file tracing picks up these static readFileSync paths
// and includes the files in the deployed function automatically.
const OG_DIR = join(process.cwd(), 'app/api/og');
const FONT_REGULAR = readFileSync(join(OG_DIR, 'fonts/JetBrainsMono-Regular.ttf'));
const FONT_BOLD = readFileSync(join(OG_DIR, 'fonts/JetBrainsMono-Bold.ttf'));
const LOGO_SRC = `data:image/png;base64,${readFileSync(join(OG_DIR, 'hrhp-mark.png')).toString('base64')}`;

// Resolve the terminal content for the requested card.
function resolveCard(searchParams: URLSearchParams): PageOg {
  const card = searchParams.get('card') ?? 'home';

  if (card === 'archive') {
    const year = (searchParams.get('year') ?? '').replace(/[^0-9]/g, '') || 'ARCHIVE';
    return archiveOg(year);
  }

  return pages[card]?.og ?? pages.home.og;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardData = resolveCard(searchParams);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          padding: '56px',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 82% 4%, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0) 55%)',
          fontFamily: 'JetBrains Mono',
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            border: '2px solid #333333',
            borderRadius: '18px',
            backgroundColor: 'rgba(10,10,10,0.78)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '20px 28px',
              borderBottom: '1px solid #2a2a2a',
              backgroundColor: 'rgba(26,26,26,0.9)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} width={34} height={34} alt="" style={{ display: 'flex' }} />
            <div style={{ display: 'flex', gap: '11px' }}>
              <div style={{ width: 15, height: 15, borderRadius: 99, backgroundColor: RED }} />
              <div style={{ width: 15, height: 15, borderRadius: 99, backgroundColor: YELLOW }} />
              <div style={{ width: 15, height: 15, borderRadius: 99, backgroundColor: GREEN }} />
            </div>
            <div style={{ display: 'flex', color: MUTED, fontSize: 22, letterSpacing: '0.04em' }}>
              {`heatpunks.org — ${cardData.path}`}
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              padding: '52px 56px',
            }}
          >
            {/* prompt + command */}
            <div style={{ display: 'flex', fontSize: 30 }}>
              <span style={{ color: GREEN, marginRight: 14 }}>~/heatpunks $</span>
              <span style={{ color: WHITE }}>{cardData.command}</span>
            </div>

            {/* wordmark (flame gradient) */}
            <div
              style={{
                display: 'flex',
                marginTop: '26px',
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1,
                backgroundImage: FLAME_GRADIENT,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {cardData.wordmark}
            </div>

            {/* optional meta line */}
            {cardData.meta ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: '22px',
                  fontSize: 30,
                  color: WHITE,
                  letterSpacing: '0.02em',
                }}
              >
                {cardData.meta}
              </div>
            ) : null}

            {/* comment + cursor */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '22px', fontSize: 28 }}>
              <span style={{ color: GREEN }}>{cardData.comment}</span>
              <div
                style={{
                  display: 'flex',
                  width: 15,
                  height: 30,
                  marginLeft: 10,
                  backgroundColor: FLAME,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'JetBrains Mono', data: FONT_REGULAR, weight: 400, style: 'normal' },
        { name: 'JetBrains Mono', data: FONT_BOLD, weight: 700, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400',
      },
    }
  );
}
