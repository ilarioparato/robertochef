import { NextResponse, type NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next()

  const { pathname } = req.nextUrl

  const allowed =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/preview-on") ||
    pathname.startsWith("/api/preview-off") ||
    pathname.startsWith("/coming-soon") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"

  if (allowed) return NextResponse.next()

  if (req.cookies.get("preview")?.value === "1") {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL("/coming-soon", req.url))
}