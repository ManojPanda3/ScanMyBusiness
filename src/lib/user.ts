import { cookies } from "next/headers"
import { verifyAccessToken, verifyRefreshToken } from "./jwt"
import { PrismaClient } from "@/generated/prisma/client"

const prisma = new PrismaClient();

export async function getUser() {

  const cookieStore = await cookies()
  try {
    const token = cookieStore.get('accessToken')?.value as string
    if (!token) throw new Error("accessToken not found")

    const decode = await verifyAccessToken(token)
    if (!decode?.payload) throw new Error('user is not loged in')

    const userId = decode?.payload?.userId as number
    if (!userId) throw new Error("userId not found")

    const user = await prisma.user.findUniqueOrThrow({ where: { id: Number(userId) }, select: { name: true, email: true } })
    return user
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error("while geting user detils", error.message)
    return false
  }
}

export async function isLoggedIn() {

  const cookieStore = await cookies()
  try {
    const token = cookieStore.get('refreshToken')?.value as string
    if (!token) throw new Error("refreshToken not found")

    const decode = await verifyRefreshToken(token)
    if (!decode?.payload?.exp) return false
    if (decode.payload.exp * 1000 < Date.now()) return false
    return true
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error("while geting user detils", error.message)
    return false
  }
}
