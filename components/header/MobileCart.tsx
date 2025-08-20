import React, { useEffect, useState } from "react"
import GlassCard from "@/components/cards/GlassCard"
import Cart from "@/components/icons/Cart"
import CloseIcon from "@/components/icons/CloseIcon"
import CartContent from "./CartContent"

interface MobileCartProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  buttonRef: React.RefObject<HTMLButtonElement | null>
  boxRef: React.RefObject<HTMLDivElement | null>
}
export default function MobileCart({ isOpen, setIsOpen, buttonRef, boxRef }: MobileCartProps) {
  const [warmed, setWarmed] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWarmed(true))
    })
  }, [])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-label={isOpen ? "Close cart" : "Open cart"}
        className="mr-2 transition-transform hover:scale-105 relative z-[110]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon size={28} /> : <Cart size={28} />}
      </button>

      {!warmed && (
        <div aria-hidden className="absolute -left-[9999px] -top-[9999px]">
          <GlassCard className="w-4 h-4" />
        </div>
      )}

      <div
        ref={boxRef}
        className="absolute right-[-7px] top-[-7px] z-[90]"
        style={{
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <div
          className={`relative transition-transform duration-150 ease-out ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          style={{ transform: "translateZ(0)" }}
        >
          <GlassCard className="w-52 max-w-[220px] p-3 pb-4 pt-10 min-h-[130px]">
            <CartContent variant="mobile" />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}