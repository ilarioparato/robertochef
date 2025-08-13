import React, { useEffect, useState } from "react"
import GlassCard from "@/components/GlassCard"
import Burger from "@/components/icons/Burger"
import CloseIcon from "@/components/icons/CloseIcon"
import NavigationLinks from "./NavigationLinks"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  buttonRef: React.RefObject<HTMLButtonElement | null>
  boxRef: React.RefObject<HTMLDivElement | null>
  isActive: (path: string) => boolean
}
export default function MobileMenu({ isOpen, setIsOpen, buttonRef, boxRef, isActive }: MobileMenuProps) {
  const [warmed, setWarmed] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWarmed(true))
    })
  }, [])

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="ml-2 transition-transform hover:scale-105 relative z-[50]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon size={28} /> : <Burger size={28} />}
      </button>

      {/* prewarm offscreen finché non warmed */}
      {!warmed && (
        <div aria-hidden className="absolute -left-[9999px] -top-[9999px]">
          <GlassCard className="w-4 h-4" />
        </div>
      )}

      {/* pannello sempre montato */}
      <div
        ref={boxRef}
        className="absolute left-[-7px] top-[-7px] z-[49]"
        style={{
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none"
        }}
        onClick={handleContentClick}
      >
        {/* animazione solo sul wrapper interno */}
        <div
          className={`relative transition-transform duration-150 ease-out ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          style={{ transform: "translateZ(0)" }}
          onClick={handleContentClick}
        >
          <GlassCard
            className="w-52 max-w-[220px] p-3 pb-6 pt-10"
            onClick={handleContentClick}
          >
            <nav className="flex flex-col px-2" onClick={handleContentClick}>
              <div className="flex flex-col space-y-5 pl-5">
                <NavigationLinks
                  isActive={isActive}
                  variant="mobile"
                  onClick={handleContentClick}
                />
              </div>
            </nav>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}