"use client"

import Link from "next/link"
import GlassCard from "@/components/cards/GlassCard"
import ChevronRight from "@/components/icons/ChevronRight"

interface CardItemProps {
  label: string;
  href: string;
  desc?: string;
}

export default function ClassCard({ label, href, desc }: CardItemProps) {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "clamp(440px, 50vh, 580px)" }}>
      <GlassCard className="w-full h-full p-5 md:p-6 flex flex-col">
        {/* Area titolo con dimensioni responsive ottimizzate */}
        <div className="min-h-[220px] flex flex-col justify-end mb-6">
          <div>
            <span className="block font-black text-white tracking-tight leading-tight title-responsive">
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

      {/* Stili CSS per rendere il titolo completamente responsive */}
      <style jsx global>{`
        .title-responsive {
          /* Dimensioni base per schermi molto piccoli */
          font-size: 2.5rem; /* 40px */
          line-height: 1.1;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          
          /* Impedisce che il testo esca dalla card */
          display: -webkit-box;
          -webkit-line-clamp: 3; /* Limita a 3 righe */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Dimensioni ottimizzate per diversi breakpoint */
        @media (min-width: 360px) {
          .title-responsive {
            font-size: 2.75rem; /* 44px */
          }
        }
        
        @media (min-width: 480px) {
          .title-responsive {
            font-size: 3rem; /* 48px */
          }
        }
        
        @media (min-width: 640px) and (max-width: 767px) {
          .title-responsive {
            font-size: 3.5rem; /* 56px - più grande su tablet piccoli */
          }
        }
        
        @media (min-width: 768px) {
          .title-responsive {
            font-size: 2.5rem; /* 40px - ritorna più piccolo su md */
            -webkit-line-clamp: 2; /* Limita a 2 righe su md */
          }
        }
        
        @media (min-width: 1024px) {
          .title-responsive {
            font-size: 2.8rem; /* 45px - cresce leggermente su lg */
          }
        }
        
        @media (min-width: 1280px) {
          .title-responsive {
            font-size: 3rem; /* 48px - ancora più grande su xl */
          }
        }
      `}</style>
    </div>
  )
}