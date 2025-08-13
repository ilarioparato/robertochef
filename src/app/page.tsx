"use client"

import { useRef, useEffect, useState, forwardRef } from "react"
import GlassCard from "@/components/GlassCard"
import Link from "next/link"
import ChevronRight from "@/components/icons/ChevronRight"
import { SITE_PADDING } from "./constants"

export default function Home() {
  return <ScrollSections />
}

function ScrollSections() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [lastSection1Scroll, setLastSection1Scroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleScroll = () => {
      const top = el.scrollTop
      const h1 = section1Ref.current?.offsetHeight || 0
      if (top < h1) {
        setLastSection1Scroll(top)
        setCurrentSection(0)
      } else {
        const h2 = section2Ref.current?.offsetHeight || 0
        setCurrentSection(top < h1 + h2 ? 1 : 2)
      }
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (currentSection === 0 && lastSection1Scroll > 0) {
      const t = setTimeout(() => {
        containerRef.current?.scrollTo({ top: lastSection1Scroll, behavior: "auto" })
      }, 40)
      return () => clearTimeout(t)
    }
  }, [currentSection, lastSection1Scroll])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto snap-y snap-proximity"
    >
      <Section1 ref={section1Ref} />
      <Section2 ref={section2Ref} />
      <Section3 ref={section3Ref} />
    </div>
  )
}

const Section1 = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className={`snap-start min-h-screen xl:h-screen w-full bg-black flex flex-col items-start justify-start
      ${SITE_PADDING} pt-32 md:pt-36 pb-32 md:pb-40 xl:pb-48`}
  >
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
      Cook, learn, taste.
    </h1>
    <div className="w-full mt-14 md:mt-20 lg:mt-24">
      <CardGrid
        items={[
          { label: "Pasta", href: "/classes" },
          { label: "Desserts", href: "/classes" },
          { label: "Pizza", href: "/classes" },
          { label: "Meat", href: "/classes" }
        ]}
      />
    </div>
  </section>
))
Section1.displayName = "Section1"

const Section2 = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className={`snap-start min-h-screen md:h-screen w-full flex flex-col items-center justify-center bg-blue-400 ${SITE_PADDING}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold text-white">Sezione 2</h2>
  </section>
))
Section2.displayName = "Section2"

const Section3 = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className={`snap-start min-h-screen md:h-screen w-full flex flex-col items-center justify-center bg-pink-400 ${SITE_PADDING}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold">Sezione 3</h2>
  </section>
))
Section3.displayName = "Section3"

interface CardGridProps {
  items: { label: string; href: string }[]
}
interface VarsStyle extends React.CSSProperties { "--card-gap"?: string }

function CardGrid({ items }: CardGridProps) {
  const style: VarsStyle = { "--card-gap": "1.75rem" }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full" style={style}>
      {items.map(it => (
        <CardItem key={it.label} label={it.label} href={it.href} />
      ))}
    </div>
  )
}

function CardItem({ label, href }: { label: string; href: string }) {
  return (
    <div className="relative w-full" style={{ height: "clamp(160px,26vh,240px)" }}>
      <GlassCard className="w-full h-full flex items-end justify-start p-5 md:p-6">
        <div className="flex flex-col items-start">
          <span className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-black leading-[1.05] text-white">
            {label}
          </span>
          <span className="text-sm md:text-base font-thin text-white">experience class</span>
        </div>
        <div className="absolute bottom-4 right-4">
          <Link href={href} aria-label={`Go to ${label} experience class`}>
            <GlassCard className="rounded-full w-18 h-11 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
              <ChevronRight size={30} color="white" />
            </GlassCard>
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}