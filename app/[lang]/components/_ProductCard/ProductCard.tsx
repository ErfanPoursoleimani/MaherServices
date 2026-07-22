'use client'
import { CardType, Product, Tag, UnderTag } from '@/types/types'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState, useCallback } from 'react'
import { useSettingsStore } from '@/stores/settingsStore'
import Image from 'next/image'
import CartButton from './components/CartButton'
import { RequestPopup } from '../../_components/RequestPopup'

interface Config { type: CardType; product: Product | UnderTag | Tag }

const ProductCard = ({ type, product }: Config) => {
  const router   = useRouter()
  const pathname = usePathname()
  const { dict } = useSettingsStore()

  const cardRef  = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const nx = (e.clientX - left - width  / 2) / (width  / 2)
      const ny = (e.clientY - top  - height / 2) / (height / 2)
      el.style.transform = `rotateX(${ny * -8}deg) rotateY(${nx * 8}deg) scale(1.04) translateZ(8px)`
      const shimmer = el.querySelector<HTMLElement>('.pc-shimmer')
      if (shimmer) {
        const px = ((e.clientX - left) / width  * 100).toFixed(1)
        const py = ((e.clientY - top ) / height * 100).toFixed(1)
        shimmer.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
      }
    })
  }, [])

  const handleMouseEnter = useCallback(() => setHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setHovered(false)
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
    const shimmer = el.querySelector<HTMLElement>('.pc-shimmer')
    if (shimmer) shimmer.style.background = ''
  }, [])

  const handleClick = useCallback(() => {
    /* if (type === CardType.UnderTag) router.push(pathname + '#productsList')
    else if (type === CardType.Tag)  router.push(pathname + '#undertagsList') */
  }, [type, pathname, router])

  const isSmall   = type === CardType.UnderTag || type === CardType.Product
  const label     = dict.services[product.label as keyof typeof dict.services]

  const CardContent = <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={[
        'flex flex-col items-center text-neutral-500 rounded-xl overflow-hidden',
        'border-emerald-100 bg-white cursor-pointer shrink-0',
        type !== CardType.Product && !hovered
          ? "border p-2"
          : "",
        isSmall
          ? 'w-20 md:w-30 h-32 md:h-42'
          : 'w-25 md:w-35 lg:w-40 h-36 md:h-48',
      ].join(' ')}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        transition: hovered
          ? 'border-color 0.3s'
          : 'transform 0.6s cubic-bezier(0.23,1,0.32,1), border-color 0.3s',
      }}
    >
      <span
        className="pc-shimmer pointer-events-none absolute inset-0 z-10 rounded-xl"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }}
      />

      {/* image */}
      <div className="w-full md:w-4/5 h-20 md:h-25 overflow-hidden shrink-0">
        <Image
          className="h-full w-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          }}
          src={product.image}
          alt={label}
          width={300}
          height={300}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="relative w-full flex-1 px-[10%]">
        <span
          className={[
            'absolute inset-0 flex items-center justify-center text-center leading-snug px-[10%]',
            isSmall
              ? 'text-[.5rem] md:text-[.7rem] lg:text-[.8rem]'
              : 'text-[.7rem] md:text-[.9rem] lg:text-[1rem]',
          ].join(' ')}
          style={{
            opacity:    hovered ? 0 : 1,
            transform:  hovered ? 'translateY(4px)' : 'translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.3s ease',
          }}
        >
          {label}
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center ${type === CardType.UnderTag ? "hidden" : ""}`}
          style={{
            opacity:   hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity 0.2s ease 0.05s, transform 0.3s cubic-bezier(0.23,1,0.32,1) 0.05s',
          }}
        >
          <CartButton type={type}/>
        </span>
      </div>
    </div>
  return (
    <>
      <RequestPopup buttonClassName={''} buttonContent={CardContent} />
    </>
    
  )
}

export default ProductCard