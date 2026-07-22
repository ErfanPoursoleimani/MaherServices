'use client'

import AnimatedBox from "@/components/ui/AnimatedBox"
import { useDataStore } from "@/stores/dataStore"
import { useSettingsStore } from "@/stores/settingsStore"
import { CardType } from "@/types/types"
import ProductCard from "../../_ProductCard/ProductCard"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

const UnderTagsSec = ({
  openUnderTag,
  openTag,
}: {
  openUnderTag: number | null
  openTag: number
}) => {
  const { tags } = useDataStore()
  const { isRTL, dict } = useSettingsStore()

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    updateScrollButtons()

    const el = scrollRef.current
    if (!el) return

    el.addEventListener("scroll", updateScrollButtons)

    const resizeObserver = new ResizeObserver(updateScrollButtons)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener("scroll", updateScrollButtons)
      resizeObserver.disconnect()
    }
  }, [openUnderTag, openTag, updateScrollButtons])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  // ✅ Guard after ALL hooks
  if (!dict || !tags || tags.length === 0 || openUnderTag === null) return <></>
  if (!tags[openTag]?.underTags?.[openUnderTag]) return <></>

  return (
    <AnimatedBox triggerOnce={false}>
      <div className="relative group">

        {canScrollLeft && (
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
        )}

        {canScrollLeft && (
          <button
            onClick={() => scroll(isRTL ? "right" : "left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
              h-12 w-12 items-center justify-center rounded-full
              bg-white/90 backdrop-blur border border-gray-200 shadow-xl
              transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <MdArrowBackIos />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll(isRTL ? "left" : "right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
              h-12 w-12 items-center justify-center rounded-full
              bg-white/90 backdrop-blur border border-gray-200 shadow-xl
              transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <MdArrowForwardIos />
          </button>
        )}

        <div
          ref={scrollRef}
          className="px-5 max-w-screen flex min-h-max
            overflow-x-auto overflow-y-clip
            gap-3 md:gap-7 lg:gap-13
            scrollbar-hide scroll-smooth select-none"
        >
          {tags[openTag].underTags[openUnderTag].products.map((product) => (
            <div key={product.id}>
              <ProductCard type={CardType.Product} product={product} />
            </div>
          ))}
        </div>

      </div>
    </AnimatedBox>
  )
}

export default UnderTagsSec