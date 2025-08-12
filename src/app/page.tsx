"use client";

import { useRef, forwardRef, useEffect, useState } from "react";
import GlassCard from "@/components/GlassCard";
import { sitePadding } from "@/components/header/Header";
import ChevronRight from "@/components/icons/ChevronRight";
import Link from "next/link";

export default function Home() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastSection1Position, setLastSection1Position] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  // Monitora lo scrolling e memorizza l'ultima posizione nella sezione 1
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const section1Height = section1Ref.current?.offsetHeight || 0;
      
      // Se siamo nella sezione 1, memorizza la posizione
      if (scrollTop < section1Height) {
        setLastSection1Position(scrollTop);
        setCurrentSection(0);
      } else {
        setCurrentSection(scrollTop < (section1Height + (section2Ref.current?.offsetHeight || 0)) ? 1 : 2);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Ripristina la posizione quando si torna alla sezione 1
  useEffect(() => {
    if (currentSection === 0 && lastSection1Position > 0) {
      // Breve ritardo per lasciare che il rendering avvenga
      const timer = setTimeout(() => {
        containerRef.current?.scrollTo({
          top: lastSection1Position,
          behavior: 'auto'
        });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [currentSection, lastSection1Position]);

  return(
    // Questo container occupa tutta la viewport e gestisce lo scrolling
    <div 
      ref={containerRef}
      className="fixed inset-0 snap-y snap-proximity overflow-y-auto" // snap-proximity per ridurre sensibilità
    >
      <Section1 ref={section1Ref} />
      <Section2 ref={section2Ref} />
      <Section3 ref={section3Ref} />
    </div>
  );
}


// ...existing imports above...

const Section1 = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className={`min-h-screen xl:h-screen w-full bg-black flex flex-col items-start justify-start pt-24 md:pt-32 pb-44 md:pb-52 xl:pb-56 snap-start ${sitePadding}`}
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-left text-white">
        Cook, learn, taste.
      </h1>

      {/* Grid full-width: carte sempre “attaccate” ai lati, gap uniforme orizz/vert */}
      <div className="w-full mt-14 md:mt-20 lg:mt-24">
        {/* Variabile gap (puoi cambiare 1.5rem) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full"
             style={{ ['--card-gap' as any]: '1.75rem' }}>
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

/* Card estratta: meno alta, un po' più larga; cresce fluid con clamp.
   - h usa clamp per adattarsi all’altezza viewport ma restare compatta
   - su mobile full width singola colonna; su lg 2 colonne con stesso gap */
function CardItem({ label, href }: { label: string; href: string }) {
  return (
    <div
      className="relative w-full"
      style={{
        // Altezza dinamica: cambia pure i valori se vuoi più / meno alte
        height: 'clamp(160px, 26vh, 240px)'
      }}
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

// ...existing code for Section2 / Section3...
// ...existing code below Section1...
// Seconda e terza sezione - stesso fix
const Section2 = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section 
      ref={ref}
      className={`min-h-screen md:h-screen w-full bg-blue-400 flex flex-col items-center justify-center snap-start ${sitePadding}`}
    >
      <h2 className="text-4xl md:text-6xl font-bold text-center text-white">
        Sezione 2
      </h2>
    </section>
  );
});
Section2.displayName = "Section2";

const Section3 = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section 
      ref={ref}
      className={`min-h-screen md:h-screen w-full bg-pink-400 flex flex-col items-center justify-center snap-start ${sitePadding}`}
    >
      <h2 className="text-4xl md:text-6xl font-bold text-center">
        Sezione 3
      </h2>
    </section>
  );
});
Section3.displayName = "Section3";