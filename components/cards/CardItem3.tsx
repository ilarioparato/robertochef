"use client"

import { forwardRef } from "react"
import GlassCard from "@/components/GlassCard"
import InfoIcon from "@/components/icons/Info"
import CloseIcon from "@/components/icons/CloseIcon"

interface CardItem3Props {
  id: 'story' | 'experience' | 'feedback'; // CORRETTO: feedbacks → feedback
  title: string;
  content: string;
  index: number;
  expandedSection: 'story' | 'experience' | 'feedback' | null; // CORRETTO: feedbacks → feedback
  isAnimating: boolean;
  showContent: boolean;
  isMobile: boolean;
  initialPositions: {
    storyTop: number;
    experienceTop: number;
    feedbackTop: number; // CORRETTO: feedbacksTop → feedbackTop
  };
  fixedHeight: number;
  onToggle: (section: 'story' | 'experience' | 'feedback') => void; // CORRETTO: feedbacks → feedback
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const CardItem3 = forwardRef<HTMLDivElement, CardItem3Props>(
  ({ id, title, content, index, expandedSection, isMobile, initialPositions, fixedHeight, onToggle, icon: Icon }, ref) => {
    
    const getTransform = () => {
      if (expandedSection !== id) return 'none';
      const currentOffset = initialPositions[`${id}Top`];
      const firstOffset = initialPositions.storyTop;
      return `translateY(-${currentOffset - firstOffset}px)`;
    };
    
    const getMarginClasses = () => {
      return index === 0 ? '' : 'mt-6 md:mt-8';
    };

    const isGhost = expandedSection && expandedSection !== id;

    const handleClick = () => {
      onToggle(id);
    };

    return (
      <div 
        ref={ref}
        className={`w-full max-w-[520px] ml-auto ${getMarginClasses()}`}
        style={{
          position: 'relative',
          zIndex: expandedSection === id ? 30 : 20,
          height: expandedSection === id ? `${fixedHeight}px` : '110px',
          transform: getTransform(),
          transformOrigin: index === 0 ? 'top center' : index === 1 ? 'center center' : 'bottom center',
          transitionProperty: 'height, transform', 
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: '0s'
        }}
      >
        <GlassCard 
          className="w-full h-full"
          style={isGhost ? {
            padding: isMobile ? '1.75rem 1.5rem 1.25rem 1.5rem' : '1.5rem 1.5rem',
            opacity: 0.01,
            transition: 'opacity 200ms ease-out',
          } : {
            padding: expandedSection === id 
              ? '1.5rem 1.5rem 2rem 1.5rem' 
              : (isMobile ? '1.75rem 1.5rem 1.25rem 1.5rem' : '1.5rem 1.5rem'),
          }}
        >
          <div style={{ 
            opacity: isGhost ? 0 : 1,
            transition: 'opacity 200ms ease-out',
          }}>
            <div className="box-header flex justify-between items-center">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <Icon className="text-white w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                </div>
                
                <span className="block text-[2rem] md:text-4xl lg:text-[2.8rem] font-black text-white tracking-tight">
                  {title}
                </span>
              </div>
              
              <div className="group">
                <GlassCard 
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  onClick={handleClick}
                >
                  {expandedSection === id ? (
                    <CloseIcon className="text-white w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
                  ) : (
                    <InfoIcon className="text-white w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
                  )}
                </GlassCard>
              </div>
            </div>
            
            {expandedSection === id && (
              <div 
                className={`mt-8 text-[15px] md:text-xl lg:text-xl text-white/80 font-normal w-full 
                          transition-opacity duration-100 ease-in-out 
                          ${true ? 'opacity-100' : 'opacity-0'}`}
              >
                {content}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    );
  }
);

CardItem3.displayName = "CardItem3";

export default CardItem3;