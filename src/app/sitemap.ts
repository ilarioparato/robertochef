import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap 
{
  const base = "https://www.robertochef.it"
  const now = new Date()

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/classes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/help`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ]
}