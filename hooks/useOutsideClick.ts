import { useEffect } from "react"

interface OutsideClickRefs {
  desktopCartButtonRef: React.RefObject<HTMLButtonElement | null>
  desktopCartBoxRef: React.RefObject<HTMLDivElement | null>
  mobileCartButtonRef: React.RefObject<HTMLButtonElement | null>
  mobileCartBoxRef: React.RefObject<HTMLDivElement | null>
  menuButtonRef: React.RefObject<HTMLButtonElement | null>
  menuBoxRef: React.RefObject<HTMLDivElement | null>
}

interface UseOutsideClickParams {
  isCartOpen: boolean
  isMenuOpen: boolean
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  refs: OutsideClickRefs
}

export function useOutsideClick({
  isCartOpen,
  isMenuOpen,
  setIsCartOpen,
  setIsMenuOpen,
  refs
}: UseOutsideClickParams) {
  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node
      const {
        desktopCartButtonRef,
        desktopCartBoxRef,
        mobileCartButtonRef,
        mobileCartBoxRef,
        menuButtonRef,
        menuBoxRef
      } = refs

      const inside =
        desktopCartButtonRef.current?.contains(target) ||
        desktopCartBoxRef.current?.contains(target) ||
        mobileCartButtonRef.current?.contains(target) ||
        mobileCartBoxRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target) ||
        menuBoxRef.current?.contains(target)

      if (!inside) {
        if (isCartOpen) setIsCartOpen(false)
        if (isMenuOpen) setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [isCartOpen, isMenuOpen, setIsCartOpen, setIsMenuOpen, refs])
}