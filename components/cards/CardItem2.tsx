"use client"

import { useState, useEffect } from "react"
import GlassCard from "@/components/GlassCard"
import InfoIcon from "@/components/icons/Info"
import CloseIcon from "@/components/icons/CloseIcon"

interface CardItem2Props {
  title: string;
  centerOnTablet?: boolean;
}

// Data per features e testi informativi
const FEATURES_DATA = {
  "The Service": [
    { text: "Home-cooking", bold: true },
    { text: "Cleaning service", bold: false },
    { text: "Table Service", bold: true },
    { text: "Groceries included", bold: false },
    { text: "Drinks on request", bold: true }
  ],
  "The Class": [
    { text: "Final Certificate", bold: false },
    { text: "Aprons, Chef hat", bold: true },
    { text: "Chef receipts", bold: false },
    { text: "Full meal service", bold: true },
    { text: "Step by step class", bold: false }
  ],
  "The Attention": [
    { text: "Allergen aware", bold: true },
    { text: "Vegan options", bold: false },
    { text: "Pregnancy friendly", bold: true },
    { text: "Kids options", bold: false },
    { text: "Pre service payment", bold: true }
  ]
};

const INFO_TEXTS = {
  "The Service": "Our Private Cooking Classes at Home service takes care of everything: from grocery shopping to cooking, table service, and leaving your kitchen spotless. Drinks are not included but can be added at checkout. We only ask that the kitchen is in acceptable condition and not crowded during the service.",
  "The Class": "Guided directly by the Chef, you'll receive aprons, a chef's hat, and printed recipes to keep. At the end, the Chef awards a certificate in advanced Italian cooking. The meal you prepare together is completed with a served antipasto and a dessert for a full dining experience.",
  "The Attention": "During checkout, guests can specify dietary needs, pregnancy considerations, or kids' adaptations. These will be applied to the full menu, visible for each class in the \"Classes\" section of the website. Payment is required at booking for the chosen date and time."
};

export default function CardItem2({ title, centerOnTablet = false }: CardItem2Props) {
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
  
  // Gestore click
  const handleInfoToggle = () => {
    setIsAnimating(true);
    setIsInfoOpen(!isInfoOpen);
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };
  
  const containerClasses = centerOnTablet 
    ? "relative w-full md:col-span-2 xl:col-span-1 md:max-w-[calc(50%-1rem)] xl:max-w-full md:mx-auto"
    : "relative w-full";

  const features = FEATURES_DATA[title as keyof typeof FEATURES_DATA] || [];
  const infoText = INFO_TEXTS[title as keyof typeof INFO_TEXTS] || "";

  return (
    <div 
      className={containerClasses} 
      style={{ 
        minHeight: "clamp(440px, 50vh, 580px)",
      }}
    >
      <GlassCard 
        className="w-full flex flex-col p-5 md:p-6" 
        style={{ 
          height: (isMobile && isInfoOpen) ? "auto" : undefined,
          minHeight: "100%",
          overflow: "visible",
          marginBottom: (isMobile && isInfoOpen && centerOnTablet) ? "2rem" : undefined,
          paddingBottom: (isMobile && isInfoOpen) ? "0.75rem" : undefined
        }}
      >
        {/* Icona Info/Close */}
        <div className="absolute top-5 right-5 md:top-6 md:right-6 z-10">
          <button 
            onClick={handleInfoToggle}
            aria-label={isInfoOpen ? "Close information" : "Show information"}
            className="focus:outline-none group" 
            style={{ touchAction: "manipulation" }}
            disabled={isAnimating}
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
        
        {/* Area di contenuto principale */}
        <div className="flex flex-col flex-grow">
          {/* Pannello info */}
          <div 
            className={`mt-5 transition-all duration-300 ease-out ${
              isInfoOpen ? 'opacity-100 visible md:mb-10 mb-0' : 'opacity-0 invisible h-0 mb-0'
            }`}
            style={{ 
              transform: isInfoOpen ? 'translateY(0)' : 'translateY(-8px)',
              paddingRight: "calc(2.5rem + 14px)"
            }}
          >
            <div className="text-lg md:text-xl lg:text-2xl text-white/60 font-normal">
              {infoText}
            </div>
          </div>
          
          {/* Pannello features */}
          <div 
            className={`mt-5 space-y-8 md:space-y-10 transition-all duration-300 ease-out ${
              isInfoOpen ? 'opacity-0 invisible h-0' : 'opacity-100 visible'
            }`}
            style={{
              transform: isInfoOpen ? 'translateY(8px)' : 'translateY(0)',
            }}
          >
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
          
          {!isMobile && <div className="flex-grow min-h-[10px]"></div>}
        </div>
        
        {/* Area titolo in basso */}
        <div className={`${isMobile && isInfoOpen ? '-mt-1 pt-0' : (isMobile ? 'mt-0 pt-0' : 'mt-auto pt-4')} 
          ${isMobile ? 'min-h-[70px]' : 'min-h-[120px]'} flex flex-col justify-end`}>
          <div>
            <span className="block text-[2.5rem] md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight leading-tight">
              {title}
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}