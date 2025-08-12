import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest 
{
  return {
    name: "Roberto Chef",
    short_name: "RobertoChef",
    description: "Experience a private chef at your home or join exclusive Italian cooking classes. Passion, flavor, and style by Roberto Chef.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}