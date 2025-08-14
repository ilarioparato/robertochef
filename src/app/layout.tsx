import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header/Header"
import Footer from "@/components/Footer"
import { useEffect } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.robertochef.com"),
  title: {
    default: "Private Chef & Cooking Classes in Italy | Roberto Chef",
    template: "%s | Roberto Chef"
  },
  description: "Experience a private chef at your home and join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
  applicationName: "Roberto Chef",
  generator: "Next.js 15",
  authors: [{ name: "Roberto Chef", url: "https://www.robertochef.com" }],
  keywords: [
    "private chef",
    "Italian cooking classes",
    "Tuscan cuisine",
    "Roberto Chef"
  ],
  category: "food",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.robertochef.com",
    siteName: "Roberto Chef",
    title: "Roberto Chef",
    description: "Experience a private chef at your home and join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
    images: [
      {
        url: "https://www.robertochef.com/pizza-preparation1.jpeg",
        width: 1200,
        height: 630,
        alt: "Roberto Chef preparing pizza Margherita"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Roberto Chef",
    description: "Experience a private chef at your home and join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
    images: ["https://www.robertochef.com/pizza-preparation1.jpeg"]
  },
  icons: {
    icon: [
      { url: "/favicon-black.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-white.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} >
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <SpeedInsights/>
        <Header/>
        <ScrollToTop />
        <main >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}