import { NextResponse, type NextRequest } from "next/server"

export function middleware(req: NextRequest) {

  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next()
  if (req.cookies.get("preview")?.value === "1") return NextResponse.next()

  const p = req.nextUrl.pathname
const allowed =
  p.startsWith("/_next") ||
  p.startsWith("/api/preview-on") ||
  p.startsWith("/api/preview-off") ||
  p.startsWith("/coming-soon") ||
  p.startsWith("/favicon") ||
  p.startsWith("/icon") ||
  p.startsWith("/images") ||      // <--- AGGIUNGI QUESTO
  p.startsWith("/videos") ||      // <--- AGGIUNGI QUESTO
  p === "/robots.txt" ||
  p.startsWith("/apple-touch-icon") ||
  p === "/sitemap.xml"

  if (allowed) return NextResponse.next()
  return NextResponse.rewrite(new URL("/coming-soon", req.url))
}

export const config = {
  matcher: [
    "/((?!_next/image|_next/static|favicon|icon|images|videos|robots.txt|sitemap.xml).*)"
  ]
}