"use client"

import { useState, useEffect } from "react"
import GlassCard from "@/components/cards/GlassCard"
import InfoIcon from "@/components/icons/Info"
import CloseIcon from "@/components/icons/CloseIcon"

// Props del componente
interface CardInfoProps {
  title: string;
  features: { text: string; bold: boolean }[];
  infoText: string;
  centerOnTablet?: boolean;
}

export default function InfoCard({ title, features, infoText, centerOnTablet = false }: CardInfoProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Rileva mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Gestore click per l'animazione
  const handleInfoToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsInfoOpen(!isInfoOpen);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };
  
  const containerClasses = centerOnTablet 
    ? "relative w-full md:col-span-2 xl:col-span-1 md:max-w-[calc(50%-1rem)] xl:max-w-full md:mx-auto"
    : "relative w-full";

  return (
    <div 
      className={containerClasses} 
      style={{ 
        minHeight: "clamp(440px, 50vh, 580px)",
        height: "auto"
      }}
    >
      <GlassCard 
        className="w-full h-full flex flex-col p-5 md:p-6 transition-all duration-300 overflow-hidden" 
      >
        {/* Contenitore principale */}
        <div className="flex-grow flex flex-col">
          {/* Contenitore per il contenuto con layout migliorato */}
          <div className="w-full mb-16 relative">
            {/* Pannello info - con flow-root per gestire correttamente il float */}
            <div 
              className={`flow-root transition-all duration-300 ease-out ${
                isInfoOpen ? 'opacity-100' : 'opacity-0 -translate-y-2 pointer-events-none absolute'
              }`}
            >
              {/* Elemento che crea lo spazio per il bottone */}
              <div className="button-space"></div>
              
              <div className="text-lg md:text-xl lg:text-2xl text-white/60 font-normal mt-5">
                {infoText}
              </div>
            </div>
            
            {/* Pannello features - anche questo con flow-root */}
            <div 
              className={`flow-root transition-all duration-300 ease-out ${
                isInfoOpen ? 'opacity-0 translate-y-2 pointer-events-none absolute' : 'opacity-100'
              }`}
            >
              {/* Elemento che crea lo spazio per il bottone */}
              <div className="button-space"></div>
              
              <div className="mt-5 space-y-8 md:space-y-10">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="text-xl md:text-2xl lg:text-2xl text-white/80 transition-all duration-300"
                    style={{ 
                      transitionDelay: `${index * 40}ms`,
                      opacity: isInfoOpen ? 0 : 1,
                      transform: isInfoOpen ? 'translateX(-10px)' : 'translateX(0)'
                    }}
                  >
                    {feature.bold ? (
                      <span className="font-extrabold">{feature.text}</span>
                    ) : (
                      <span className="font-light">{feature.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Area titolo in basso */}
          <div className="mt-auto">
            <h3 
              className="text-[2.5rem] md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight leading-tight"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {title}
            </h3>
          </div>
        </div>
        
        {/* Contenitore per pulsante info/chiudi */}
        <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
          <button 
            onClick={handleInfoToggle}
            aria-label={isInfoOpen ? "Close information" : "Show information"}
            className="focus:outline-none group" 
          >
            <GlassCard className="w-14 h-14 flex items-center justify-center cursor-pointer transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110 active:scale-95 active:duration-200">
              {isInfoOpen ? (
                <CloseIcon className="text-white w-7 h-7 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
              ) : (
                <InfoIcon className="text-white w-7 h-7 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
              )}
            </GlassCard>
          </button>
        </div>
      </GlassCard>

      {/* Stile CSS per il flusso del testo intorno al bottone */}
      <style jsx global>{`
        /* Flow-root crea un nuovo contesto di formattazione del blocco,
           che è essenziale per gestire correttamente gli elementi float */
        .flow-root {
          display: flow-root;
        }
        
        /* Questo elemento flottante crea lo spazio per il bottone
           e fa sì che il testo fluisca intorno ad esso, ma solo
           nella zona superiore. Una volta superata l'altezza del bottone,
           il testo occuperà naturalmente tutta la larghezza disponibile */
        .button-space {
          float: right;
          width: 80px; /* Larghezza del bottone + extra spazio */
          height: 80px; /* Altezza del bottone + extra spazio */
          margin-left: 10px; /* Un po' di margine dal testo a sinistra */
        }
        
        @media (max-width: 320px) {
          .text-lg {
            font-size: 1rem;
          }
          .text-xl {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  )
}