"use client"

import Link from 'next/link'
import { SITE_PADDING } from '@/src/app/constants'
import LogoIcon from '@/components/icons/Logo'

export default function Footer() {
  return (
    <footer className={`bg-black/70 backdrop-blur-md py-16 ${SITE_PADDING}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 justify-items-center">
        {/* Colonna sinistra - Legal Info */}
        <div className="flex flex-col items-center lg:items-start w-full max-w-[220px]">
          <h3 className="text-white font-black text-3xl mb-6 text-center lg:text-left">Legal Info</h3>
          <nav className="flex flex-col space-y-3 items-center lg:items-start w-full">
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </nav>
        </div>

        {/* Colonna centrale - Social Media */}
        <div className="flex flex-col items-center lg:items-start w-full max-w-[220px]">
          <h3 className="text-white font-black text-3xl mb-6 text-center lg:text-left">Connect</h3>
          <nav className="flex flex-col space-y-3 items-center lg:items-start w-full">
            <FooterLink href="https://instagram.com/robertocchef" external>Instagram</FooterLink>
            <FooterLink href="https://facebook.com/robertocchef" external>Facebook</FooterLink>
            <FooterLink href="mailto:info@robertochef.com">Email</FooterLink>
          </nav>
        </div>

        {/* Colonna destra - Support, centrata su tablet */}
        <div className="flex flex-col items-center lg:items-start w-full max-w-[220px] md:col-span-2 lg:col-span-1">
          <h3 className="text-white font-black text-3xl mb-6 text-center lg:text-left">Support</h3>
          <nav className="flex flex-col space-y-3 items-center lg:items-start w-full">
            <FooterLink href="/help">Help</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </nav>
        </div>
      </div>
      
      {/* Logo posizionato tra i link e il copyright */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="group cursor-pointer">
          <LogoIcon 
            className="w-16 h-16 text-white transition-transform duration-500 group-hover:rotate-180" 
          />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} Roberto Chef. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// Componente per i link del footer con stile unificato
interface FooterLinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

function FooterLink({ href, external, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-white/60 font-light text-base hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  )
}