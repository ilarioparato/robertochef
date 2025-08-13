import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")
  if (token !== process.env.PREVIEW_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const res = NextResponse.redirect(new URL("/", req.url))
  res.cookies.set("preview", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 4 // 4 ore
  })
  return res
}