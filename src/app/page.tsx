"use client"

import { useRef, forwardRef, useEffect, useState } from "react"
import GlassCard from "@/components/GlassCard"
import { sitePadding } from "@/components/header/Header"
import ChevronRight from "@/components/icons/ChevronRight"
import Link from "next/link"

interface CardGridStyle extends React.CSSProperties {
  '--card-gap'?: string
}

export default function Home() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [lastSection1Position, setLastSection1Position] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const section1Height = section1Ref.current?.offsetHeight || 0
      if (scrollTop < section1Height) {
        setLastSection1Position(scrollTop)
        setCurrentSection(0)
      } else {
        setCurrentSection(
          scrollTop <
            section1Height + (section2Ref.current?.offsetHeight || 0)
            ? 1
            : 2
        )
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (currentSection === 0 && lastSection1Position > 0) {
      const timer = setTimeout(() => {
        containerRef.current?.scrollTo({
          top: lastSection1Position,
          behavior: "auto"
        })
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [currentSection, lastSection1Position])

  const cardGridStyle: CardGridStyle = { "--card-gap": "1.75rem" }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 snap-y snap-proximity overflow-y-auto"
    >
      <Section1 ref={section1Ref} cardGridStyle={cardGridStyle} />
      <Section2 ref={section2Ref} />
      <Section3 ref={section3Ref} />
    </div>
  )
}

// Section1
const Section1 = forwardRef<
  HTMLDivElement,
  { cardGridStyle: CardGridStyle }
>(({ cardGridStyle }, ref) => {
  return (
    <section
      ref={ref}
      className={`min-h-screen xl:h-screen w-full bg-black flex flex-col items-start justify-start pt-24 md:pt-32 pb-44 md:pb-52 xl:pb-56 snap-start ${sitePadding}`}
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-left text-white">
        Cook, learn, taste.
      </h1>

      <div className="w-full mt-14 md:mt-20 lg:mt-24">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full"
          style={cardGridStyle}
        >
          {[
            { label: "Pasta", href: "/classes" },
            { label: "Desserts", href: "/classes" },
            { label: "Pizza", href: "/classes" },
            { label: "Meat", href: "/classes" }
          ].map(item => (
            <CardItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
    </section>
  )
})
Section1.displayName = "Section1"

function CardItem({ label, href }: { label: string; href: string }) {
  return (
    <div
      className="relative w-full"
      style={{ height: "clamp(160px, 26vh, 240px)" }}
    >
      <GlassCard className="w-full h-full flex items-end justify-start p-5 md:p-6">
        <div className="flex flex-col items-start">
          <span className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-black leading-[1.05] text-white">
            {label}
          </span>
          <span className="text-sm md:text-base font-thin text-white">
            experience class
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <Link href={href} aria-label={`Book ${label} Experience`}>
            <GlassCard className="rounded-full w-12 h-8 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
              <ChevronRight size={20} color="white" />
            </GlassCard>
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}

// Section2
const Section2 = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className={`min-h-screen md:h-screen w-full bg-blue-400 flex flex-col items-center justify-center snap-start ${sitePadding}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold text-center text-white">
      Sezione 2
    </h2>
  </section>
))
Section2.displayName = "Section2"

// Section3
const Section3 = forwardRef<HTMLDivElement>((_, ref) => (
  <section
    ref={ref}
    className={`min-h-screen md:h-screen w-full bg-pink-400 flex flex-col items-center justify-center snap-start ${sitePadding}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold text-center">Sezione 3</h2>
  </section>
))
Section3.displayName = "Section3"