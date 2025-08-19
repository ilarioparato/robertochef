"use client"

import { useEffect } from "react";

export default function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Salva la posizione dello scroll
      const scrollY = window.scrollY;
      
      // Blocca lo scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Ripristina lo scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
}