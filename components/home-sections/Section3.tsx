"use client"

import { useState, useEffect, useRef } from "react"
import { SITE_PADDING } from "@/src/app/constants"
import useScrollLock from "@/hooks/useScrollLock"
import useMobileDetector from "@/hooks/useMobileDetector"
import CardItem3 from "../cards/CardItem3"
import OpenBookIcon from "@/components/icons/OpenBook"
import KeyIcon from "@/components/icons/Key"
import SmileIcon from "@/components/icons/Smile"
import Image from "next/image"

// Dati per le card della Section3
const CHEF_INFO_DATA = [
  { 
    id: 'story',
    title: 'My Story',
    content: "Born in Naples, I first discovered my love for cooking by watching my grandmother at work in the kitchen. From her I inherited not only family recipes, but also a passion for the traditions and culture of Naples and Italy. Later, life brought me to Siena, right in the heart of the Crete Senesi, where these roots blended with new inspirations.",
    icon: OpenBookIcon
  },
  { 
    id: 'experience',
    title: 'Experience',
    content: "Over the years I have worked in restaurants, hotels, and resorts ranging from cozy local spots to elegant 4 and 5 star establishments. I also had the joy of teaching young students, sharing with them the same passion my grandmother once passed on to me. Today, I bring that passion directly to people's homes, cooking and creating memorable moments wherever they are.",
    icon: KeyIcon
  },
  {
    id: 'feedback',
    title: 'Feedback',
    content: '',
    icon: SmileIcon
  }
];

// Componente separato TOTALMENTE INDIPENDENTE per l'immagine di sfondo
// Modifica solo il componente RobertoBackground
// Componente separato TOTALMENTE INDIPENDENTE per l'immagine di sfondo
// Modifica solo il componente RobertoBackground
// Modifica solo il componente RobertoBackground

const RobertoBackground = () => {
  const isMobile = useMobileDetector();
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="roberto-bg" style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'sticky',
        top: isMobile ? '25vh' : '10vh',
        bottom: 0,
        left: 0,
        width: '100%',
        height: isMobile ? '75vh' : '90vh',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease-in',
      }}>
        <div style={{
          position: 'relative',
          // MODIFICATO: Aumentata ulteriormente la dimensione su desktop
          width: isMobile ? '140%' : '85%', // Aumentato da 70% a 85%
          height: '100%',
          // MODIFICATO: Spostato leggermente più a sinistra per bilanciare l'aumento di dimensione
          margin: isMobile ? '0 0 0 -40%' : '0 0 0 -15%', // Aumentato da -5% a -15%
        }}>
          <Image
            src="/images/gallery/roberto-face.png"
            alt="Roberto Chef"
            fill
            className="object-contain object-bottom"
            style={{
              transform: isMobile ? 'scale(1.3)' : 'none',
              filter: 'brightness(0.9) contrast(1.05)',
              // Dissolvenza nella parte finale/inferiore
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))'
            }}
            quality={90}
            priority
            sizes="(max-width: 768px) 140vw, 85vw" // Aggiornato anche il sizes attribute
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
      </div>
      
      {/* Overlay sfumato - lasciato invariato */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
        zIndex: 1,
      }} />
    </div>
  );
};

export default function Section3() {
  // Stati per gestire l'espansione e le animazioni
  const [expandedSection, setExpandedSection] = useState<'story' | 'experience' | 'feedback' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Hook personalizzato per rilevare se siamo su mobile
  const isMobile = useMobileDetector();
  
  // Refs per tracciare le posizioni dei box
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = {
    story: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    feedback: useRef<HTMLDivElement>(null)
  };
  
  // Memorizza l'altezza totale in modo fisso
  const [fixedHeight, setFixedHeight] = useState(0);
  const [normalHeight, setNormalHeight] = useState(0);
  const [initialPositions, setInitialPositions] = useState({
    storyTop: 0,
    experienceTop: 0,
    feedbackTop: 0
  });
  
  // Blocca lo scroll durante le animazioni
  useScrollLock(isAnimating);
  
  // Calcola le posizioni iniziali e l'altezza una sola volta all'inizio
  useEffect(() => {
    function calculateDimensions() {
      const box1 = boxRefs.story.current;
      const box2 = boxRefs.experience.current;
      const box3 = boxRefs.feedback.current;
      
      if (!box1 || !box2 || !box3) return;
      
      const box1Rect = box1.getBoundingClientRect();
      const box2Rect = box2.getBoundingClientRect();
      const box3Rect = box3.getBoundingClientRect();
      
      // Memorizza le posizioni
      setInitialPositions({
        storyTop: box1Rect.top,
        experienceTop: box2Rect.top,
        feedbackTop: box3Rect.top
      });
      
      // Calcola l'altezza normale (3 box + margini)
      const normalTotalHeight = box3Rect.bottom - box1Rect.top;
      setNormalHeight(normalTotalHeight);
      
      // Calcola l'altezza espansa
      const expandedHeight = box3Rect.bottom - box1Rect.top;
      setFixedHeight(expandedHeight);
    }
    
    const timer = setTimeout(calculateDimensions, 100);
    return () => clearTimeout(timer);
  }, []);

const handleToggle = (section: 'story' | 'experience' | 'feedback') => {
  if (isAnimating) return;
  
  setIsAnimating(true);
  
  if (expandedSection === section) {
    // Chiusura - RIDOTTO DRASTICAMENTE I TIMER
    setShowContent(false);
    setTimeout(() => {
      setExpandedSection(null);
      // Risolto: rilascia immediatamente il controllo dello scroll
      setIsAnimating(false);
    }, 200); // Ridotto da 300ms a 200ms
  } else {
    // Apertura - RIDOTTO DRASTICAMENTE I TIMER
    if (expandedSection) {
      setShowContent(false);
      setTimeout(() => {
        setExpandedSection(section);
        setTimeout(() => {
          setShowContent(true);
          setIsAnimating(false);
        }, 200); // Ridotto da 600ms a 200ms
      }, 200); // Ridotto da 300ms a 200ms
    } else {
      setExpandedSection(section);
      setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 100); // Ridotto da 600ms a 200ms
    }
  }
};

// ... resto del codice ...

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen w-full relative overflow-hidden ${SITE_PADDING}`}
    >
      {/* IMPORTANTE: L'immagine è ora in un componente totalmente separato */}
      <RobertoBackground />

      {/* 
        IMPORTANTE: Questa struttura DOM è diversa - abbiamo rimosso 
        la nidificazione extra e ora usiamo un singolo div per il contenuto 
      */}
      <div className="relative z-10 pt-32 md:pt-36 pb-32 md:pb-40 min-h-screen flex flex-col">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
          Roberto, your Private Chef.
        </h2>

        <div className="mt-14 md:mt-20 w-full">
          {/* IMPORTANTE: Questo contenitore ora ha position:static */}
  <div 
    ref={containerRef} 
    style={{ 
      paddingBottom: "40px",
      height: normalHeight + 40, // Altezza fissa basata sull'altezza normale + padding
      position: 'relative' // Importante per il posizionamento assoluto interno
    }}
  >
    {/* Div di posizionamento separato per i box */}
    <div className="relative">
      {CHEF_INFO_DATA.map((item, index) => (
        <CardItem3
          key={item.id}
          id={item.id as 'story' | 'experience' | 'feedback'}
          title={item.title}
          content={item.content}
          index={index}
          ref={boxRefs[item.id as keyof typeof boxRefs]}
          expandedSection={expandedSection}
          isAnimating={isAnimating}
          showContent={showContent}
          isMobile={isMobile}
          initialPositions={initialPositions}
          fixedHeight={fixedHeight}
          onToggle={handleToggle}
          icon={item.icon}
        />
      ))}
    </div>
  </div>
        </div>
      </div>
    </section>
  )
}