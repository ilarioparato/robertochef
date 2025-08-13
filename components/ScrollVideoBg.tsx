"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  srcMp4: string
  srcWebm?: string
  poster?: string
  topOverlay?: React.ReactNode
}

type VideoWithFastSeek = HTMLVideoElement & { fastSeek?: (time: number) => void }
function hasFastSeek(v: HTMLVideoElement): v is Required<VideoWithFastSeek> {
  return "fastSeek" in v && typeof (v as { fastSeek?: unknown }).fastSeek === "function"
}

type VideoRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number
}

export default function ScrollVideoBg({ srcMp4, srcWebm, poster, topOverlay }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const durationRef = useRef(0)
  const targetTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const readyRef = useRef(false)
  const paintedRef = useRef(false)
  const [painted, setPainted] = useState(false)

  // Setup + prime iOS
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.playsInline = true
    v.setAttribute("playsinline", "")
    v.setAttribute("webkit-playsinline", "")
    v.setAttribute("muted", "")

    const onLoaded = () => {
      durationRef.current = v.duration || 0
    }

    const onCanPlay = async () => {
      try {
        await v.play()
        v.pause()
        v.currentTime = 0.001
      } catch {}
      readyRef.current = true
    }

    const onError = () => {
      readyRef.current = false
      paintedRef.current = false
      setPainted(false)
    }

    v.addEventListener("loadedmetadata", onLoaded)
    v.addEventListener("canplay", onCanPlay)
    v.addEventListener("error", onError)

    // Prime anche alla prima interazione (fallback iOS) con listener tipizzato
    const touchOptions: AddEventListenerOptions = { passive: true, capture: false }
    const primeOnFirstTouch = (e: Event): void => {
      const vv = videoRef.current
      if (!vv) return
      void (async () => {
        try {
          await vv.play()
          vv.pause()
          vv.currentTime = Math.max(0.001, vv.currentTime)
          readyRef.current = true
        } catch {}
      })()
      // una sola volta
      window.removeEventListener("touchstart", primeOnFirstTouch, touchOptions)
    }
    window.addEventListener("touchstart", primeOnFirstTouch, touchOptions)

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded)
      v.removeEventListener("canplay", onCanPlay)
      v.removeEventListener("error", onError)
      window.removeEventListener("touchstart", primeOnFirstTouch, touchOptions)
    }
  }, [])

  // Scroll sync
  useEffect(() => {
    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (prefersReduce) return

    const step = () => {
      const vid = videoRef.current as (HTMLVideoElement & VideoRVFC) | null
      if (!vid) { rafRef.current = null; return }

      const target = targetTimeRef.current
      const current = vid.currentTime
      const delta = target - current

      if (Math.abs(delta) > 0.8 && hasFastSeek(vid)) {
        vid.fastSeek(target)
      } else {
        vid.currentTime = current + delta * 0.22
      }

      if (!paintedRef.current) {
        if (vid.requestVideoFrameCallback) {
          vid.requestVideoFrameCallback(() => {
            if (!paintedRef.current) {
              paintedRef.current = true
              setPainted(true)
            }
          })
        } else if (Math.abs(target - vid.currentTime) < 0.05) {
          paintedRef.current = true
          setPainted(true)
        }
      }

      if (Math.abs(target - vid.currentTime) > 0.02) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }

    const update = () => {
      if (!readyRef.current) return
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop || 0
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll))
      targetTimeRef.current = progress * durationRef.current
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step)
    }

    const onScroll = () => requestAnimationFrame(update)
    const onResize = () => requestAnimationFrame(update)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Poster overlay finché non disegna il primo frame */}
      {poster && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-300 ${painted ? "opacity-0" : "opacity-100"}`}
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        preload="auto"
        muted
        playsInline
        poster={poster}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>

      {topOverlay}
    </div>
  )
}