import React from "react"
import Link from "next/link"

interface NavigationLinksProps {
  isActive: (path: string) => boolean
  variant: "mobile" | "desktop"
  onClick?: (e: React.MouseEvent) => void
}

// Dati di navigazione centralizzati
const navigationItems = [
  { href: "/classes", label: "Classes" },
  { href: "/booking", label: "Booking" },
  { href: "/help", label: "Help" },
  { href: "/blog", label: "Blog" }
]

export default function NavigationLinks({ isActive, variant, onClick }: NavigationLinksProps) {
  // Stili diversi a seconda del contesto (mobile o desktop)
  const getStyles = (path: string) => {
    if (variant === "desktop") {
      return `transition-transform hover:scale-105 ${
        isActive(path) 
          ? "font-black text-[1.05rem]" 
          : "font-light"
      }`
    } else {
      return `transition-transform hover:scale-105 ${
        isActive(path) 
          ? "font-semibold text-[1.1rem]" 
          : "font-light text-[1rem]"
      }`
    }
  }

  return (
    <>
      {navigationItems.map((item) => (
        variant === "mobile" ? (
          <div key={item.href} className="flex items-center">
            {isActive(item.href) && (
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute -ml-4"></div>
            )}
            <Link 
              href={item.href} 
              className={getStyles(item.href)}
              onClick={onClick}
            >
              {item.label}
            </Link>
          </div>
        ) : (
          <Link 
            key={item.href}
            href={item.href} 
            className={getStyles(item.href)}
          >
            {item.label}
          </Link>
        )
      ))}
    </>
  )
}