"use client"

import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ChevronRight from "@/components/icons/ChevronRight"
import { SITE_PADDING } from "@/src/app/constants"
import CardItem2 from "../cards/CardItem2"

export default function Section2() {
  const section2Cards = [
    { title: "The Service" },
    { title: "The Class" },
    { title: "The Attention", centerOnTablet: true }
  ];

  return (
    <section className={`min-h-screen w-full flex flex-col ${SITE_PADDING} pt-32 md:pt-36  md:pb-20`}>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white">
        Your class, made simple.
      </h2>

      <div className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {section2Cards.map((card, index) => (
            <CardItem2 
              key={card.title} 
              title={card.title} 
              centerOnTablet={card.centerOnTablet} 
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link href="/booking" aria-label="Book now">
            <div className="transition-transform duration-700 ease-in-out transform hover:scale-105">
              <GlassCard className="flex items-center justify-center px-8 py-5 cursor-pointer transition-all duration-700 ease-in-out hover:brightness-110 group">
                <span className="text-xl md:text-2xl font-bold text-white mr-4 transition-all duration-700 ease-in-out group-hover:mr-6">
                  Book Now
                </span>
                <div className="relative overflow-hidden w-7">
                  <ChevronRight 
                    size={36} 
                    color="white" 
                    className="transform transition-all duration-700 ease-in-out group-hover:translate-x-1" 
                  />
                </div>
              </GlassCard>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}