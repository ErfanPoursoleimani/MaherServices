'use client'

import SmallLogo from '@/app/[lang]/_components/SmallLogo'
import ProductCard from '@/app/[lang]/components/_ProductCard/ProductCard'
import AnimatedBox from '@/components/ui/AnimatedBox'
import { useDataStore } from '@/stores/dataStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { CardType, Product } from '@/types/types'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

const SearchBar = () => {
    const { lang } = useParams()

    const { tags } = useDataStore()
    const { dict, isRTL } = useSettingsStore()

    const { search, in: inn } = dict

    const [isActive, setIsActive] = useState(false)
    const [basicQuery, setBasicQuery] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const allItems = useMemo<(Product)[]>(() => {
        return tags.flatMap((tag) =>
            tag.underTags.flatMap((underTag) => underTag.products)
        )
    }, [tags])

    const basicResults = useMemo(() => {
        if (!basicQuery.trim()) return []

        const lowerQuery = basicQuery.toLowerCase()

        return allItems
            .filter((item) => {
                const label = dict.services[item.label as keyof typeof dict.services]
                return label?.toLowerCase().includes(lowerQuery)
            })
            .sort((a, b) => {
                // Prioritize items whose label STARTS WITH the query
                const labelA = dict.services[a.label as keyof typeof dict.services]?.toLowerCase() ?? ''
                const labelB = dict.services[b.label as keyof typeof dict.services]?.toLowerCase() ?? ''
                const lowerQuery = basicQuery.toLowerCase()

                const aStarts = labelA.startsWith(lowerQuery)
                const bStarts = labelB.startsWith(lowerQuery)

                if (aStarts && !bStarts) return -1
                if (!aStarts && bStarts) return 1
                return labelA.localeCompare(labelB)
            })
    }, [basicQuery, allItems, dict.services])

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
      }, [basicResults , updateScrollButtons])
    
      const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        const amount = scrollRef.current.clientWidth * 0.8
        scrollRef.current.scrollBy({
          left: direction === "left" ? -amount : amount,
          behavior: "smooth",
        })
      }

    // Reset query every time the bar opens or closes
    const handleToggle = (forceClose = false) => {
        setIsActive((prev) => {
            const next = forceClose ? false : !prev
            return next
        })
        // Always clear on close
        if (isActive || forceClose) {
            setBasicQuery('')
        }
    }

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        setBasicQuery('')
        inputRef.current?.focus()
    }

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isActive])

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleToggle(true)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isActive])

    return (
        <>
            <div
                className={`relative flex items-center justify-stretch gap-2 rounded-[7px] flex-1 xl:flex-initial xl:min-w-[600px]`}
            >
                {/* Collapsed trigger */}
                <div
                    className={`${isRTL ? 'flex-end flex-row-reverse' : 'flex-start'} ${
                        isActive ? 'md:hidden' : ''
                    } bg-[#e6e6e6] p-2 md:p-3 text-[#555555] flex items-center justify-stretch gap-2 rounded-[7px] flex-1 cursor-pointer`}
                    onClick={() => handleToggle()}
                >
                    <LuSearch className="text-[17px]" />

                    <div className="space-x-[3px] text-[13px]">
                        <span>{search}</span>
                        <span className="md:hidden">{inn}</span>
                        <span
                            className="md:hidden text-transparent"
                            style={{
                                background:
                                    'linear-gradient(-90deg, #000, #279FF5, #000, #279FF5, #000)',
                                backgroundSize: '300% 300%',
                                backgroundClip: 'text',
                                animation: 'gradientShift 6s ease infinite',
                            }}
                        >
                            <style>{`
                                @keyframes gradientShift {
                                    0% { background-position: 0% 50%; }
                                    50% { background-position: 100% 50%; }
                                    100% { background-position: 0% 50%; }
                                }
                            `}</style>
                            <SmallLogo style={{ fontSize: '17px' }} />
                        </span>
                    </div>
                </div>

                {/* Expanded search input */}
                {isActive && (
                    <AnimatedBox
                        className={`z-111 px-3 pb-2 md:px-4 bg-white text-[#555555] flex flex-col items-stretch gap-2 md:rounded-t-[7px] flex-1 max-md:absolute max-md:w-[calc(100vw)] ${
                            isRTL
                                ? 'max-md:-top-3 max-md:-left-22'
                                : 'max-md:-top-3 max-md:-left-3'
                        }`}
                    >
                        {/* Input row with clear button */}
                        <div className={`relative flex items-center border-b-2 rounded-[7px] border-[#03a58a] ${isRTL ? "flex-row-reverse" : ""}`}>
                            <LuSearch className="text-[17px] text-neutral-400 pointer-events-none" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={basicQuery}
                                onChange={(e) => setBasicQuery(e.target.value)}
                                placeholder={search}
                                className={`${
                                    isRTL ? 'text-end' : ''
                                } h-[43px] px-8 text-[13px] md:text-[15px] p-3 max-md:mt-2 w-full outline-0 flex-1`}
                            />
                            {basicQuery && (
                                <button
                                    onClick={handleClear}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label="Clear search"
                                >
                                    <LuX className="text-[15px]" />
                                </button>
                            )}
                        </div>

                        {/* Results dropdown */}
                            <div 
                                className={`
                                    ${!basicQuery.trim() ? 'hidden' : ''} 
                                    overflow-clip flex-1 gap-1 text-[13px] px-3 py-4 pt-10 max-md:px-0 bg-white rounded-b-[7px] md:absolute md:top-full 
                                    ${isRTL ? 'justify-end md:right-0' : 'md:left-0'}
                                    w-full relative group`}
                            >
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
                                        className={`${
                                            !basicQuery.trim() ? 'hidden' : ''
                                        } overflow-auto scrollbar-hide scroll-smooth flex-1 flex gap-1 text-[13px] bg-white rounded-b-[7px]${
                                            isRTL ? 'justify-end md:right-0' : 'md:left-0'
                                        } w-full`}
                                    >
                                        {basicResults.length > 0 ? (
                                            basicResults.map((product) => (
                                                    <div
                                                        key={
                                                            product.type === 'Product'
                                                                ? product.id + 2000
                                                                : product.type === 'UnderTag'
                                                                ? product.id + 1000
                                                                : product.id
                                                        }
                                                    >
                                                        <ProductCard
                                                            type={CardType.UnderTag}
                                                            product={product}
                                                        />
                                                    </div>
                                            ))
                                                ) : (
                                                    <div className="text-center w-full text-neutral-500 py-4">
                                                        محصولی پیدا نشد
                                                    </div>
                                        )}
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
                    </AnimatedBox>
                )}
            </div>

            {/* Backdrop */}
            <div
                className="fixed top-0 left-0 bg-[#000000c2] md:bg-[#00000094] w-full h-screen z-110"
                style={{ display: isActive ? 'block' : 'none' }}
                onClick={() => handleToggle(true)}
            />
        </>
    )
}

export default SearchBar