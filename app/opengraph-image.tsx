import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'Hesham & Nada — Save the Date, June 12, 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function OpengraphImage() {
  const photoBytes = await readFile(
    path.join(process.cwd(), 'public/photos/Hesham-Nada.jpg')
  );
  const photoSrc = `data:image/jpeg;base64,${photoBytes.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#f4e4e1',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            width: 470,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            background: '#f4e4e1',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={406}
            height={566}
            style={{
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 12px 40px rgba(58, 42, 42, 0.18)',
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 80px 64px 24px',
            color: '#3a2a2a',
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#7a6a6a',
            }}
          >
            Save the Date
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#3a2a2a',
            }}
          >
            Hesham
          </div>
          <div
            style={{
              fontSize: 56,
              fontStyle: 'italic',
              color: '#bfa14a',
              lineHeight: 1,
              margin: '4px 0',
            }}
          >
            &amp;
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#3a2a2a',
            }}
          >
            Nada
          </div>
          <div
            style={{
              marginTop: 36,
              width: 88,
              height: 3,
              background: '#bfa14a',
              borderRadius: 2,
            }}
          />
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: '#3a2a2a',
              fontWeight: 500,
            }}
          >
            Friday · June 12, 2026
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 24,
              color: '#7a6a6a',
            }}
          >
            Panorama October Garden · Cairo
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
