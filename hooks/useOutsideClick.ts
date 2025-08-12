import { RefObject, useEffect } from "react"

interface UseOutsideClickProps {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  refs: {
    desktopCartButtonRef: RefObject<HTMLButtonElement>;
    desktopCartBoxRef: RefObject<HTMLDivElement>;
    mobileCartButtonRef: RefObject<HTMLButtonElement>;
    mobileCartBoxRef: RefObject<HTMLDivElement>;
    menuButtonRef: RefObject<HTMLButtonElement>;
    menuBoxRef: RefObject<HTMLDivElement>;
  };
}

export function useOutsideClick({
  isCartOpen,
  isMenuOpen,
  setIsCartOpen,
  setIsMenuOpen,
  refs
}: UseOutsideClickProps) {
  useEffect(() => {
    if (!isCartOpen && !isMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      // Gestione per il carrello
      if (isCartOpen && 
          !(refs.desktopCartBoxRef.current?.contains(event.target as Node) || 
            refs.desktopCartButtonRef.current?.contains(event.target as Node) ||
            refs.mobileCartBoxRef.current?.contains(event.target as Node) ||
            refs.mobileCartButtonRef.current?.contains(event.target as Node))) {
        setIsCartOpen(false);
      }
      
      // Gestione per il menu
      if (isMenuOpen && 
          !(refs.menuBoxRef.current?.contains(event.target as Node) || 
            refs.menuButtonRef.current?.contains(event.target as Node))) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isCartOpen, isMenuOpen, refs, setIsCartOpen, setIsMenuOpen])
}