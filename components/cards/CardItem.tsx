"use client"

import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ChevronRight from "@/components/icons/ChevronRight"

interface CardItemProps {
  label: string;
  href: string;
  desc?: string;
}

export default function CardItem({ label, href, desc }: CardItemProps) {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "clamp(440px, 50vh, 580px)" }}>
      <GlassCard className="w-full h-full p-5 md:p-6 flex flex-col">
        {/* Area titolo */}
        <div className="min-h-[220px] flex flex-col justify-end mb-6">
          <div>
            <span className="block text-5xl md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight leading-tight">
              {label}
            </span>
            <span className="block text-sm md:text-base font-thin text-white/80 -mt-1">
              experience class
            </span>
          </div>
        </div>

        {/* Area descrizione */}
        <div className="flex-grow flex flex-col"> 
          {desc && (
            <div className="text-base md:text-lg font-normal text-white/80 break-words">
              {desc}
            </div>
          )}
          
          {/* Spazio forzato per il bottone */}
          <div className="h-20 mt-auto"></div>
        </div>

        {/* Bottone con animazione */}
        <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 z-20">
          <Link href={href} aria-label={`Go to ${label}`}>
            <GlassCard className="rounded-full w-16 h-11 flex items-center justify-center cursor-pointer transform transition-all duration-400 ease-in-out hover:scale-105 hover:brightness-110 overflow-hidden group">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Freccia che esce */}
                <div className="absolute transition-transform duration-500 ease-in transform group-hover:translate-x-[115px]">
                  <ChevronRight size={32} color="white" />
                </div>
                
                {/* Freccia che entra */}
                <div className="absolute -left-[100px] transition-transform duration-500 ease-out transform group-hover:translate-x-[115px]">
                  <ChevronRight size={32} color="white" />
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}