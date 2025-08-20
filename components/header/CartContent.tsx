import React from "react"
import Link from "next/link"
import GlassCard from "@/components/cards/GlassCard"

interface CartContentProps {
  variant: "mobile" | "desktop"
  onClick?: (e: React.MouseEvent) => void
}

export default function CartContent({ variant, onClick }: CartContentProps) {
  const isMobile = variant === "mobile"
  
  return (
    <div className="flex flex-col" onClick={onClick}>
      <p className={`text-center text-base font-light ${isMobile ? "mb-2" : "mb-3"}`}>
        No order in progress
      </p>
      
      <div className="px-2 pb-1" onClick={onClick}>
        <Link href="/booking" onClick={onClick}>
          <GlassCard className="py-2.5 px-3 text-center cursor-pointer group overflow-hidden transform transition-all duration-500 ease-in-out hover:bg-white/10 hover:scale-105 hover:shadow-lg">
            <span className="text-lg font-bold inline-block transition-transform duration-500 ease-in-out group-hover:translate-y-[-2px]">
              Book Now
            </span>
          </GlassCard>
        </Link>
      </div>
    </div>
  )
}