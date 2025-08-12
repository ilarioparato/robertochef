import { usePathname } from "next/navigation"

export function useNavigation() {
  const pathname = usePathname()
  
  // Funzione per determinare se il link è attivo
  const isActive = (path: string) => {
    return pathname === path
  }
  
  return {
    isActive,
    currentPath: pathname
  }
}