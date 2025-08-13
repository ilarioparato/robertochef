"use client"

import { useEffect, useRef } from "react"

type Props = {
  srcMp4: string
  srcWebm?: string
  poster?: string
  topOverlay?: React.ReactNode
}

export default function ScrollVideoBg({ srcMp4, srcWebm, poster, topOverlay }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const durationRef = useRef(0)
  const targetTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const readyRef = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => {
      durationRef.current = v.duration || 0
      readyRef.current = durationRef.current > 0
      try { v.currentTime = 0.001 } catch {}
    }
    v.addEventListener("loadedmetadata", onLoaded)
    return () => v.removeEventListener("loadedmetadata", onLoaded)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.muted = true

    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (prefersReduce) return

    const step = () => {
      const vid = videoRef.current
      if (!vid) { rafRef.current = null; return }
      const target = targetTimeRef.current
      const current = vid.currentTime
      const delta = target - current

      if (Math.abs(delta) > 0.8 && typeof (vid as any).fastSeek === "function") {
        ;(vid as any).fastSeek(target)
      } else {
        vid.currentTime = current + delta * 0.22
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
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transform-gpu scale-[1.01]"
        preload="auto"
        playsInline
        muted
        poster={poster}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>
      {topOverlay}
    </div>
  )
}