// OPTION 1: semplice pagina /error (route pubblica), NON è l'error boundary.
// Assicurati che CI SIA un export default (mancava, da qui l'errore "is not a module").
"use client"

import Link from "next/link"

export default function ErrorRoute() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight">
        Error
      </h1>
      <p className="mt-4 text-white/70 max-w-md text-center">
        Something went wrong. This is a temporary error page.
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