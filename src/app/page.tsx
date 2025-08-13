"use client"

import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ChevronRight from "@/components/icons/ChevronRight"
import { SITE_PADDING } from "./constants"
import ScrollVideoBg from "../../components/ScrollVideoBg"

const CARD_DATA = [
  { label: "Pasta",    href: "/classes", desc: "Fresh handmade pasta techniques." },
  { label: "Desserts", href: "/classes", desc: "Italian sweets & elegant plating." },
  { label: "Pizza",    href: "/classes", desc: "High hydration dough & stone baking." },
  { label: "Meat",     href: "/classes", desc: "Cuts, searing and slow roasting." }
]

export default function Home() {
  return (
    <>
      <ScrollVideoBg
        srcMp4="/videos/bg.mp4"
        // srcWebm="/videos/bg.webm"
        poster="/images/bg-poster.jpg"
      />
      <main className="relative z-10">
        <Section1 />
        <Section2 />
        <Section3 />
      </main>
    </>
  )
}

function Section1() {
  return (
    <section className={`min-h-screen w-full flex flex-col ${SITE_PADDING} pt-32 md:pt-36 pb-32 md:pb-40`}>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
        Cook, learn, taste.
      </h1>

      <div className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {CARD_DATA.map(c => (
            <CardItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Section2() {
  return (
    <section className={`min-h-screen w-full flex flex-col items-center justify-center ${SITE_PADDING}`}>
      <h2 className="text-4xl md:text-6xl font-bold text-white">Section 2</h2>
    </section>
  )
}

function Section3() {
  return (
    <section className={`min-h-screen w-full flex flex-col items-center justify-center ${SITE_PADDING}`}>
      <h2 className="text-4xl md:text-6xl font-bold text-white">Section 3</h2>
    </section>
  )
}

function CardItem({ label, href, desc }: { label: string; href: string; desc?: string }) {
  return (
    <div className="relative w-full" style={{ height: "clamp(440px, 60vh, 580px)" }}>
      <GlassCard className="absolute inset-0 w-full h-full p-5 md:p-6 overflow-hidden">
        {/* Titolo fisso poco prima della metà */}
        <div className="absolute left-5 md:left-6 right-5 md:right-6 top-[44%] -translate-y-1/2">
          <span className="block text-5xl md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight leading-tight">
            {label}
          </span>
        </div>

        {/* Sottotitolo + descrizione: confinati nell’area, non escono dal box */}
        <div className="absolute left-5 md:left-6 right-5 md:right-6 top-[50%] md:top-[48%] bottom-20 overflow-hidden">
          <span className="block text-sm md:text-base font-thin text-white/80">
            experience class
          </span>
          {desc && (
            <span className="mt-2 block text-base md:text-lg font-normal text-white/80 break-words">
              {desc}
            </span>
          )}
        </div>

        {/* Bottone in basso a destra */}
        <Link href={href} aria-label={`Go to ${label}`} className="absolute bottom-5 right-5">
          <GlassCard className="rounded-full w-16 h-11 flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
            <ChevronRight size={26} color="white" />
          </GlassCard>
        </Link>
      </GlassCard>
    </div>
  )
}