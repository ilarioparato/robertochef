"use client"

// Ensure the path is correct; if your CardItem is in 'components/cards/CardItem.tsx', keep as is.
// If it's in a different location, update the path accordingly, for example:
import CardItem from "../cards/ClassCard"
// Or, if using 'src/components/cards/CardItem.tsx':
// import CardItem from "../../src/components/cards/CardItem"
import { SITE_PADDING } from "@/src/app/constants"

const CARD_DATA = [
  { label: "Pasta",    href: "/classes", desc: "Learn the art of fresh pasta, from tagliatelle to stuffed ravioli, using genuine ingredients and traditional techniques. A flavorful journey starting right from your hands." },
  { label: "Desserts", href: "/classes", desc: "Discover the secrets to perfectly cooked meat: marinades, premium cuts, and techniques to enhance flavor and tenderness—just like in a fine dining restaurant." },
  { label: "Pizza",    href: "/classes", desc: "From custard cream to chocolate delights, learn how to create irresistible desserts with elegant presentation and impeccable taste. The perfect ending to any meal." },
  { label: "Meat",     href: "/classes", desc: "From dough preparation to oven baking, make the perfect pizza with fresh ingredients and pizzaiolo secrets. Crispy on the outside, soft on the inside—just like in a real pizzeria." }
]

export default function ClassesSection() {
  return (
    <section className={`min-h-screen w-full flex flex-col ${SITE_PADDING} pt-24 md:pt-36 pb-16 md:pb-40`}>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
        Cook, learn, taste.
      </h1>

      <div className="mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {CARD_DATA.map(c => (
            <CardItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}