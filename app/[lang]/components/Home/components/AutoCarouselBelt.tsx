'use client'

import { useDataStore } from '@/stores/dataStore'
import { useSettingsStore } from '@/stores/settingsStore'
import Image from 'next/image'
import { Product, UnderTag } from '@/types/types'
import { useRef, useState, useEffect, useCallback } from 'react'

const AutoCarouselBelt = () => {
  const { tags } = useDataStore()
  const { dict } = useSettingsStore()

  const trackRef = useRef<HTMLDivElement>(null)
  const animRef  = useRef<number>(0)
  const posRef   = useRef(0)
  const speedRef = useRef(0.5)          // px per frame — tweak here
  const pausedRef = useRef(false)

  const [isDragging, setIsDragging] = useState(false)
  const dragStartX  = useRef(0)
  const dragStartPos = useRef(0)

  const biggestTag = tags[2]
  if (!biggestTag) return null

  const products: Product[] = [...(biggestTag.underTags.flatMap((u: UnderTag) => u.products)), ...(tags[4].underTags.flatMap(((u: UnderTag) => u.products)))]
  // Triple-clone so there's always a full set visible at any scroll position
  const items = [...products, ...products, ...products]

  // ── animation loop ──────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const el = trackRef.current
    if (!el) return

    if (!pausedRef.current) {
      posRef.current -= speedRef.current

      // Seamless reset: one "set" width = total / 3
      const setWidth = el.scrollWidth / 3
      if (Math.abs(posRef.current) >= setWidth) {
        posRef.current += setWidth
      }

      el.style.transform = `translateX(${posRef.current}px)`
    }

    animRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [tick])

  // ── hover pause ─────────────────────────────────────────────────────────
  const handleMouseEnter = () => { pausedRef.current = true }
  const handleMouseLeave = () => {
    if (!isDragging) pausedRef.current = false
  }

  // ── drag to scrub ────────────────────────────────────────────────────────
  const startDrag = (clientX: number) => {
    pausedRef.current = true
    setIsDragging(true)
    dragStartX.current   = clientX
    dragStartPos.current = posRef.current
  }

  const moveDrag = (clientX: number) => {
    if (!isDragging) return
    const delta = clientX - dragStartX.current
    posRef.current = dragStartPos.current + delta
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${posRef.current}px)`
  }

  const endDrag = () => {
    setIsDragging(false)
    pausedRef.current = false
  }

  return (
    <div className="relative w-full select-none">

      {/* top rule */}
      <div className="w-full h-px bg-white/15 mb-3" />

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0  w-16 z-10
        bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10
        bg-linear-to-l from-white to-transparent" />

      {/* track */}
      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e)  => startDrag(e.clientX)}
        onMouseMove={(e)  => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e)  => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-max will-change-transform"
        >
          {items.map((product, i) => (
            <BeltItem
              key={`${product.id}-${i}`}
              product={product}
              label={dict?.services?.[product.label as keyof typeof dict.services]}
            />
          ))}
        </div>
      </div>

      {/* bottom rule */}
      <div className="w-full h-px bg-white/15 mt-3" />
    </div>
  )
}

// ── item ──────────────────────────────────────────────────────────────────
const BeltItem = ({ product, label }: { product: Product; label?: string }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative shrink-0 w-14 md:w-20 rounded-lg overflow-hidden"
      style={{
        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease',
        transform: hovered ? 'scale(1.12) translateY(-3px)' : 'scale(1)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.18)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={product.image}
        width={200}
        height={200}
        alt={label ?? ''}
        draggable={false}
        className="w-full h-full object-cover"
      />

      {/* overlay + label on hover */}
      <div
        className="absolute inset-0 flex items-end p-1.5"
        style={{
          background: hovered ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.08)',
          transition: 'background 0.3s ease',
        }}
      >
        <span
          className="text-white text-[0.55rem] md:text-[0.65rem] leading-tight font-medium"
          style={{
            opacity:   hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.25s ease 0.05s, transform 0.3s ease 0.05s',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default AutoCarouselBelt