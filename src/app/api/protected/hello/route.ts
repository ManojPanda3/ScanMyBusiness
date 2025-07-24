
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = request.headers.get('X-CURRENT-USER-ID');
  return NextResponse.json({ message: 'Hello from protected API!', userId });
}
