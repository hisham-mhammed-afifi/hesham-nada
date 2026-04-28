import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4e4e1',
          color: '#3a2a2a',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 78,
            fontWeight: 600,
            color: '#3a2a2a',
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          H&N
        </div>
        <div
          style={{
            marginTop: 14,
            width: 64,
            height: 3,
            background: '#bfa14a',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            marginTop: 10,
            fontSize: 14,
            color: '#7a6a6a',
            letterSpacing: 2,
          }}
        >
          06.12.26
        </div>
      </div>
    ),
    { ...size }
  );
}
