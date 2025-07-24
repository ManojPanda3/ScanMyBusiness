
import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }
    const new_user = { id: user.id, email: user.email, name: user.name }
    const accessToken = await generateAccessToken(new_user);
    const refreshToken = await generateRefreshToken(new_user);
    if (!accessToken) throw new Error("Unable to create accessToken")
    if (!refreshToken) throw new Error("Unable to create refreshToken")
    const response = NextResponse.json({ user: new_user });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;

  } catch (error) {
    console.error("Error while loging in: ", error.message)
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error while logging in.",
      error: error.message
    }, { status: 500 })
  }
}
