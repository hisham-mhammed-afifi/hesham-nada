import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4e4e1',
          color: '#bfa14a',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'serif',
          letterSpacing: -1,
        }}
      >
        H&N
      </div>
    ),
    { ...size }
  );
}
