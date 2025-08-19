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
  // Stili di base a seconda del contesto (mobile o desktop)
  const getBaseStyles = (path: string) => {
    if (variant === "desktop") {
      return `${
        isActive(path) 
          ? "font-black text-[1.05rem]" 
          : "font-light"
      }`
    } else {
      return `${
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
              onClick={onClick}
              className="block group" // Aggiunto group qui
            >
              {/* Contenitore con l'effetto di animazione */}
              <div className={`relative overflow-hidden ${getBaseStyles(item.href)}`}>
                <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                  {item.label}
                </div>
                <div className="absolute top-full left-0 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                  {item.label}
                </div>
              </div>
            </Link>
          </div>
        ) : (
          // Versione desktop
          <Link 
            key={item.href} 
            href={item.href} 
            className="block group" // Aggiunto group qui
          >
            <div className={`relative overflow-hidden ${getBaseStyles(item.href)}`}>
              <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                {item.label}
              </div>
              <div className="absolute top-full left-0 transform transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                {item.label}
              </div>
            </div>
          </Link>
        )
      ))}
    </>
  )
}