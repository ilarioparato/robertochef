// filepath: /Users/ilarioparato/robertochef/src/app/api/preview-off/route.ts
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url))
  res.cookies.set("preview", "", { path: "/", maxAge: 0 })
  return res
}