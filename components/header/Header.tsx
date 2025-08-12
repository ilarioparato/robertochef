"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import Logo from "@/components/icons/Logo"
import GlassCard from "@/components/GlassCard"
import MobileMenu from "./MobileMenu"
import MobileCart from "./MobileCart"
import DesktopCart from "./DesktopCart"
import NavigationLinks from "./NavigationLinks"
import { useNavigation } from "@/hooks/useNavigation"
import { useOutsideClick } from "@/hooks/useOutsideClick"

// Padding responsive
export const sitePadding =
  "px-7 sm:px-10 md:px-14 lg:px-20 xl:px-[var(--fluid-pad)]"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const desktopCartButtonRef = useRef<HTMLButtonElement>(null)
  const desktopCartBoxRef = useRef<HTMLDivElement>(null)
  const mobileCartButtonRef = useRef<HTMLButtonElement>(null)
  const mobileCartBoxRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuBoxRef = useRef<HTMLDivElement>(null)

  const { isActive } = useNavigation()

  useOutsideClick({
    isCartOpen,
    isMenuOpen,
    setIsCartOpen,
    setIsMenuOpen,
    refs: {
      desktopCartButtonRef,
      desktopCartBoxRef,
      mobileCartButtonRef,
      mobileCartBoxRef,
      menuButtonRef,
      menuBoxRef
    }
  })

  const hideMobileLogo = isMenuOpen || isCartOpen
  const mobileLogoClasses =
    "absolute left-1/2 -translate-x-1/2 transition-opacity duration-150 " +
    (hideMobileLogo ? "opacity-0 pointer-events-none" : "opacity-100")

  return (
    <header className={`w-full flex items-center justify-between fixed top-0 left-0 right-0 bg-transparent py-3 z-50 ${sitePadding}`}>
      {/* MOBILE */}
      <div className="relative flex w-full items-center justify-between md:hidden py-1.5">
        <MobileMenu
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            buttonRef={menuButtonRef}
            boxRef={menuBoxRef}
            isActive={isActive}
        />

        {/* Logo mobile centrato che scompare quando menu o cart aperti */}
        <Link href="/" aria-label="Home" className={mobileLogoClasses}>
          <Logo className="h-11 w-auto" />
        </Link>

        <MobileCart
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          buttonRef={mobileCartButtonRef}
          boxRef={mobileCartBoxRef}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex w-full items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo className="h-14 w-auto transition-transform hover:scale-105" />
        </Link>

        <nav aria-label="Main navigation">
          <GlassCard className="flex gap-12 px-10 py-3 text-white">
            <NavigationLinks isActive={isActive} variant="desktop" />
          </GlassCard>
        </nav>

        <DesktopCart
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          buttonRef={desktopCartButtonRef}
          boxRef={desktopCartBoxRef}
        />
      </div>
    </header>
  )
}