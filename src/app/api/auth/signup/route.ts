import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!user) throw new Error("Unable to create user on database")

    const response = NextResponse.json({ success: true, status: 200 });

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
