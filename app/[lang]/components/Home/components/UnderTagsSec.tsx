'use client'
import { useDataStore } from "@/stores/dataStore";
import { useSettingsStore } from "@/stores/settingsStore";
import ProductCard from "../../_ProductCard/ProductCard";
import { CardType } from "@/types/types";
import { useRef } from "react";

const UnderTagsSec = ({ openItem, setOpenUnderTag }: { openItem: number; setOpenUnderTag: Function }) => {
  const { tags } = useDataStore()
  const { isRTL, dict } = useSettingsStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  if (!dict || !tags || tags.length === 0) return <></>
  
  const tag = tags[openItem] 
  if (!tag) return <></>

  return (
    <div className="relative group">
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20
          h-12 w-12 items-center justify-center rounded-full
          bg-white/90 backdrop-blur shadow-lg border border-gray-200
          opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="max-w-screen relative px-5 flex min-h-max
          overflow-x-auto overflow-y-clip gap-3 sm:gap-6 md:gap-7 lg:gap-13
          scrollbar-hide scroll-smooth"
      >
        {tag.underTags.map((underTag, i) => (
          <div key={underTag.id} onMouseEnter={() => setOpenUnderTag(i)}>
            <ProductCard type={CardType.UnderTag} product={underTag} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20
          h-12 w-12 items-center justify-center rounded-full
          bg-white/90 backdrop-blur shadow-lg border border-gray-200
          opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default UnderTagsSec