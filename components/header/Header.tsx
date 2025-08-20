"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/icons/Logo"
import GlassCard from "@/components/cards/GlassCard"
import MobileMenu from "./MobileMenu"
import MobileCart from "./MobileCart"
import DesktopCart from "./DesktopCart"
import NavigationLinks from "./NavigationLinks"
import { useNavigation } from "@/hooks/useNavigation"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { SITE_PADDING } from "@/src/app/constants"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const desktopCartButtonRef = useRef<HTMLButtonElement | null>(null)
  const desktopCartBoxRef    = useRef<HTMLDivElement | null>(null)
  const mobileCartButtonRef  = useRef<HTMLButtonElement | null>(null)
  const mobileCartBoxRef     = useRef<HTMLDivElement | null>(null)
  const menuButtonRef        = useRef<HTMLButtonElement | null>(null)
  const menuBoxRef           = useRef<HTMLDivElement | null>(null)

  const { isActive } = useNavigation()
  const pathname = usePathname()
  
  // Chiudi entrambi al cambio pagina
  useEffect(() => {
    setIsCartOpen(false)
    setIsMenuOpen(false)
  }, [pathname])

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
  
  // Setter modificati per garantire esclusività
  const setMenuOpenExclusive: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setIsMenuOpen(prev => {
      const next = typeof value === "function" ? value(prev) : value;
      if (next) {
        // Se sto aprendo il menu, chiudo il carrello
        setIsCartOpen(false);
      }
      return next;
    });
  };
  
  const setCartOpenExclusive: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setIsCartOpen(prev => {
      const next = typeof value === "function" ? value(prev) : value;
      if (next) {
        // Se sto aprendo il carrello, chiudo il menu
        setIsMenuOpen(false);
      }
      return next;
    });
  };

  // Logo sempre visibile: rimosso il toggle di opacità
  const mobileLogoClasses = "absolute left-1/2 -translate-x-1/2 transition-opacity duration-150 opacity-100";

  return (
    <header className={`w-full flex items-center justify-between fixed top-0 left-0 right-0 bg-transparent py-3 z-50 ${SITE_PADDING}`}>
      {/* MOBILE */}
      <div className="relative flex w-full items-center justify-between md:hidden py-1.5">
        <MobileMenu
            isOpen={isMenuOpen}
            setIsOpen={setMenuOpenExclusive}
            buttonRef={menuButtonRef}
            boxRef={menuBoxRef}
            isActive={isActive}
        />

        {/* Logo mobile centrato sempre visibile */}
        <Link href="/" aria-label="Home" className={mobileLogoClasses}>
          <Logo className="h-11 w-auto" />
        </Link>

        <MobileCart
          isOpen={isCartOpen}
          setIsOpen={setCartOpenExclusive} 
          buttonRef={mobileCartButtonRef}
          boxRef={mobileCartBoxRef}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex w-full items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0 transition-transform duration-700 ease-in-out hover:rotate-180">
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