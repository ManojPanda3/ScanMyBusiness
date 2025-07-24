import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    if (!body?.email || !body?.id) {
      return NextResponse.json({
        message: 'email or user id needed',
        status: 400,
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        OR: [{ email: body?.email }, { id: body?.id }]
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    if (!body.perv_password) {
      return NextResponse.json({ message: 'previous password is required to verify', status: 400 }, { status: 400 })
    }
    const isPasswordValid: boolean = await bcrypt.compare(body.prev_password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    if (!body.new_password) {
      return NextResponse.json({ message: 'new password is required to verify', status: 400 }, { status: 400 })
    }

    const updated_user = await prisma.user.update({
      where: {
        OR: [{ email: body?.email }, { id: body?.id }],
      },
      update: {
        password: await bcrypt.hash(body.prev_password, 10)
      },
    });
    if (!updated_user) {
      return NextResponse.json({ message: 'failed to update password' }, { status: 400 })
    }
    return NextResponse.json({ message: 'password reset successfully.', status: 200 }, { status: 200, statusText: "successfully reset the password" })
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      success: false,
    }, { status: 500 })
  }
}
