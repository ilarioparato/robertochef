
import Footer from '../../components/Footer'
import './globals.css'
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"
import Header, { sitePadding } from "@/components/header/Header"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.robertochef.com"),
  title: 
  {
    default: "Private Chef & Cooking Classes in Italy | Roberto Chef",
    template: "%s | Roberto Chef",
  },
  description: "Experience a private chef at your home or join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: 
  {
    type: "website",
    url: "https://www.robertochef.com",
    siteName: "Roberto Chef",
    title: "Roberto Chef",
    description: "Experience a private chef at your home or join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
    images: [{ url: "/pizza-preparation1.jpeg", width: 1200, height: 630, alt: "Roberto Chef preparing pizza Margherita" }],
  },
  twitter: 
  {
    card: "summary_large_image",
    title: "Roberto Chef",
    description: "Experience a private chef at your home or join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
    images: ["/pizza-preparation1.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon-black.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-white.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "food",
  keywords: ["private chef", "Italian cooking classes", "Tuscan cuisine", "Roberto Chef"],
  authors: [{ name: "Roberto Chef", url: "https://www.robertochef.com" }],
  applicationName: "Roberto Chef",
  generator: "Next.js 15"
}

export const viewport: Viewport = 
{
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000000" }, { media: "(prefers-color-scheme: light)", color: "#ffffff" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const HEADER_H = 64 // Altezza header in px, usata per il padding del main
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main
          className={`relative ${sitePadding} pt-[${HEADER_H}px]`}
          style={{ paddingTop: HEADER_H }}
        >
          <div
            className="flex flex-col items-center justify-center mx-auto text-center"
            style={{ minHeight: `calc(100vh - ${HEADER_H}px)` }}
          >
            <h1 className="font-black tracking-tight text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              SOMETHING SPECIAL IS COMING...
            </h1>
            <p className="mt-8 max-w-xl text-white/70 text-lg md:text-xl font-light">
              We are crafting an elevated culinary experience. Stay tuned.
            </p>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}