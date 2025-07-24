import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const handleUnauthorized = () => {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  };

  if (!accessToken && !refreshToken) {
    return handleUnauthorized();
  }

  if (accessToken) {
    const decoded = await verifyAccessToken(accessToken);
    if (decoded) {
      const response = NextResponse.next();
      console.log(decoded)
      response.headers.set('X-CURRENT-USER-ID', (decoded.payload as { userId: number }).userId.toString());
      return response;
    }
  }

  if (refreshToken) {
    const decoded = await verifyRefreshToken(refreshToken);
    if (decoded) {
      const newAccessToken = await generateAccessToken({ id: (decoded.payload as { userId: number }).userId });
      if (!newAccessToken) return NextResponse.json({ message: "Unable to generate refresh token." }, { status: 500 })
      const response = NextResponse.next();
      response.headers.set('X-CURRENT-USER-ID', (decoded, payload as { userId: number }).userId.toString());
      return response;
    }
  }

  return handleUnauthorized();
}

export const config = {
  matcher: ['/api/protected/:path*', '/dashboard/:path*'],
};
