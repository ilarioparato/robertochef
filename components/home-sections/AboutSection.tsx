"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import React from "react"
import { SITE_PADDING } from '@/src/app/constants'

// Importa i componenti riutilizzabili e i tipi
import { TabId } from "../tabs/TabId"
import TabNavigation from "../tabs/TabNavigation"
import TabContentCard from "../tabs/TabContentCard"

// Importa le icone
import OpenBook from "../icons/OpenBook"
import Key from "../icons/Key"
import Smile from "../icons/Smile"

// --- DATA SOURCE ---
// Tutti i dati sono centralizzati qui
const TABS_DATA = [
  {
    id: 'story' as TabId,
    label: 'My Story',
    content: "Trained in the finest culinary traditions of Italy and France, I bring a unique blend of Mediterranean flavors to your dining experience. My journey began in the rustic kitchens of Tuscany, where I learned that great cooking comes from passion, quality ingredients, and respect for tradition.",
    getIcon: (className: string) => <OpenBook className={className} />,
    getCardIcon: (isDesktop: boolean) => <OpenBook className={isDesktop ? "text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0" : "text-white w-7 h-7 flex-shrink-0"} />
  },
  {
    id: 'experience' as TabId,
    label: 'Experience',
    content: "With over 15 years of experience cooking in prestigious restaurants across Europe and private chef services for discerning clients worldwide, I've refined my craft to deliver exceptional dining experiences. Each meal is crafted with precision, creativity, and attention to every detail.",
    getIcon: (className: string) => <Key className={className} />,
    getCardIcon: (isDesktop: boolean) => <Key className={isDesktop ? "text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0" : "text-white w-7 h-7 flex-shrink-0"} />
  },
  {
    id: 'feedback' as TabId,
    label: 'Feedback',
    content: "\"Roberto transformed our anniversary dinner into an unforgettable experience. His attention to detail and personalized menu exceeded all expectations.\" - Maria & Antonio\n\n\"The flavors, presentation, and service were impeccable. An absolute culinary genius!\" - The Wilsons",
    getIcon: (className: string) => <Smile className={className} />,
    getCardIcon: (isDesktop: boolean) => <Smile className={isDesktop ? "text-white w-8 h-8 md:w-10 md:h-10 flex-shrink-0" : "text-white w-7 h-7 flex-shrink-0"} />
  }
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabId>('story');
  const [isExtraSmall, setIsExtraSmall] = useState(false);
  const [tabMinHeight, setTabMinHeight] = useState("320px"); // Valore di default
  
  // Rileva dimensioni dello schermo
  useEffect(() => {
    const checkScreenSize = () => {
      setIsExtraSmall(window.innerWidth < 340);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Trova i dati del tab attivo
  const activeTabData = useMemo(() => TABS_DATA.find(tab => tab.id === activeTab)!, [activeTab]);

  // Prepara i dati per il componente TabNavigation
  const navigationTabs = useMemo(() => TABS_DATA.map(tab => {
    const isActive = tab.id === activeTab;
    const iconStyle = `text-white ${isActive ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`;
    const iconSize = 'w-5 h-5 md:w-7 md:h-7';
    return {
      id: tab.id,
      label: tab.label,
      icon: tab.getIcon(`${iconSize} ${iconStyle}`)
    };
  }), [activeTab]);

  // Calcola l'altezza minima necessaria per contenere il tab più alto
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Solo per mobile
    
    // Definiamo altezze diverse in base alla dimensione dello schermo
    const baseHeight = isExtraSmall ? 300 : 320;
    
    // Aggiungiamo altezza in base alla lunghezza del contenuto del tab più lungo
    const longestContent = Math.max(...TABS_DATA.map(tab => tab.content.length));
    const extraHeight = Math.min(80, longestContent / 20); // 1 carattere = 0.05px di altezza extra, max 80px
    
    setTabMinHeight(`${baseHeight + extraHeight}px`);
  }, [isExtraSmall]);
  
  return (
    <section className="relative min-h-screen md:min-h-[calc(100vh-80px)] pb-20 md:pb-24">
      <div className={`${SITE_PADDING} pt-10 md:pt-12 flex flex-col`}>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6">
          Roberto, your Private Chef.
        </h2>
        
        {/* Layout desktop e tablet */}
        <div className="hidden md:flex w-full" style={{ height: 'calc(100vh - 250px)' }}>
          <div className="w-[48%] relative mt-2">
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black opacity-90 z-10"></div>
              <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
                <Image src="/images/gallery/roberto-face.png" alt="Roberto Chef" fill className="object-contain" sizes="50vw" priority style={{ objectPosition: '0% 0%' }} />
              </div>
            </div>
          </div>
          
          <div className="w-[52%] pl-4 md:pl-6 lg:pl-8 flex flex-col">
            <TabNavigation tabs={navigationTabs} activeTab={activeTab} onTabChange={setActiveTab} isDesktop />
            <TabContentCard 
              title={activeTabData.label}
              content={activeTabData.content}
              icon={activeTabData.getCardIcon(true)}
              activeTabId={activeTab}
              isDesktop
            />
          </div>
        </div>
        
        {/* Layout mobile con altezza fissa per le tab */}
        <div className="md:hidden flex-1 flex flex-col">
          <div className="relative -mx-4">
            <div className="h-[50vh] w-full relative" style={{ 
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)', 
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)' 
              }}>
              <Image 
                src="/images/gallery/roberto-face.png" 
                alt="Roberto Chef" 
                fill 
                className="object-contain object-top" 
                sizes="100vw" 
                priority 
              />
            </div>
          </div>
          
          <div className="-mt-4">
            <TabNavigation tabs={navigationTabs} activeTab={activeTab} onTabChange={setActiveTab} isExtraSmall={isExtraSmall} />
          </div>
          
          {/* Wrapper con altezza fissa attorno al TabContentCard */}
          <div style={{ minHeight: tabMinHeight }} className="transition-height duration-300">
            <TabContentCard 
              title={activeTabData.label}
              content={activeTabData.content}
              icon={activeTabData.getCardIcon(false)}
              activeTabId={activeTab}
              minHeight={tabMinHeight}
            />
          </div>
        </div>
      </div>
    </section>
  )
}