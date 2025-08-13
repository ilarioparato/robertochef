"use client"

// Boundary globale: viene mostrata quando un errore (throw) non gestito accade
// in qualunque segmento sotto / (solo lato client/server render).
// NON creare anche /src/app/error/page.tsx se usi questo file.
export default function GlobalError(
  { error, reset }: { error: Error; reset: () => void }
) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
        <h1 className="text-4xl md:text-5xl font-black">Something went wrong</h1>
        <p className="mt-4 text-white/60 max-w-md text-center">
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Try again
        </button>
      </body>
    </html>
  )
}