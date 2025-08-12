"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight">404</h1>
      <p className="mt-4 text-white/70 max-w-md text-center">
        Page not found.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
      >
        Go back home
      </Link>
    </main>
  )
}