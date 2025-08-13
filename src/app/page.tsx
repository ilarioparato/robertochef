"use client"

import { useRef, useEffect, useState, forwardRef } from "react"
import GlassCard from "@/components/GlassCard"
import Link from "next/link"
import ChevronRight from "@/components/icons/ChevronRight"
import { SITE_PADDING } from "./constants"

// ...existing code...
const CARD_DATA = [
  { label: "Pasta",    href: "/classes", desc: "Learn the art of fresh pasta, from tagliatelle to stuffed ravioli, using genuine ingredients and traditional techniques. A flavorful journey starting right from your hands." },
  { label: "Desserts", href: "/classes", desc: "Discover the secrets to perfectly cooked meat: marinades, premium cuts, and techniques to enhance flavor and tenderness—just like in a fine dining restaurant." },
  { label: "Pizza",    href: "/classes", desc: "From custard cream to chocolate delights, learn how to create irresistible desserts with elegant presentation and impeccable taste. The perfect ending to any meal." },
  { label: "Meat",     href: "/classes", desc: "From dough preparation to oven baking, make the perfect pizza with fresh ingredients and pizzaiolo secrets. Crispy on the outside, soft on the inside—just like in a real pizzeria." }
]
// ...existing

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
    className={`snap-start min-h-screen xl:h-screen w-full bg-black flex flex-col ${SITE_PADDING} pt-32 md:pt-36 pb-32 md:pb-40`}
  >
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
      Cook, learn, taste.
    </h1>

    {/* GRID CARDS: 4 → 2 → 1, gap uniforme, niente wrapper che schiaccia */}
    <div className="mt-14 md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {CARD_DATA.map(c => (
          <CardItem key={c.label} {...c} />
        ))}
      </div>
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

// ...existing code...
// ...existing code...
function CardItem({ label, href, desc }: { label: string; href: string; desc?: string }) {
  return (
    <div className="relative w-full" style={{ height: "clamp(440px, 60vh, 580px)" }}>
      <GlassCard className="absolute inset-0 w-full h-full p-5 md:p-6 overflow-hidden">
        {/* Titolo: fisso poco prima della metà */}
        <div className="absolute left-5 md:left-6 right-5 md:right-6 top-[44%] -translate-y-1/2">
          <span className="block text-5xl md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight leading-tight">
            {label}
          </span>
        </div>

        {/* Sottotitolo + descrizione: area confinata tra top e bottom */}
        <div className="absolute left-5 md:left-6 right-5 md:right-6 top-[48%] bottom-20 overflow-hidden">
          <span className="block text-sm md:text-base font-thin text-white/80">
            experience class
          </span>
          {desc && (
            <span className="mt-2 block text-sm md:text-base font-regular text-white/80 break-words">
              {desc}
            </span>
          )}
        </div>

        {/* Bottone in basso a destra (spazio riservato con bottom-20 sopra) */}
        <Link
          href={href}
          aria-label={`Go to ${label} experience class`}
          className="absolute bottom-5 right-5"
        >
          <GlassCard className="rounded-full w-16 h-11 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
            <ChevronRight size={26} color="white" />
          </GlassCard>
        </Link>
      </GlassCard>
    </div>
  )
}
// ...existing code...
// ...existing code...