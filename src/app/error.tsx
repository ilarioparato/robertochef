"use client"
import GlassCard from "@/components/GlassCard"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight text-center uppercase">
            ERROR
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-white/70 max-w-md text-center font-light">
            Something went wrong. Please cook your pasta again later.
          </p>
          
          <div className="mt-12 flex justify-center">
            <GlassCard className="w-auto inline-block p-0 overflow-hidden group transition-transform hover:scale-105 duration-300">
              <button
                onClick={() => reset()}
                className="px-8 py-4 block text-white text-lg md:text-xl font-medium"
              >
                Try again
              </button>
            </GlassCard>
          </div>
        </div>
  )
}