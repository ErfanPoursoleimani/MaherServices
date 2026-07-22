'use client'
import { useCarousel } from "@/hooks/useCarousel";
import { useSettingsStore } from "@/stores/settingsStore";
import { Tag } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function CarouselDemo({data, setOpenItem, setOpenUnderTag}: {data: Tag[] | {id: number, label: string, image: string}[], setOpenItem: Function, setOpenUnderTag: Function}) {

  const {dict} = useSettingsStore()

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    dragCurrentX.current = clientX;
  }, [isDragging]);

  const handleDragEnd = useCallback((index: number) => {
    const dragDistance = dragCurrentX.current - dragStartX.current;
    
    if (dragDistance === 0) {
      goToIndex(index);
      toggleAutoPlay();
    }
  
    setIsDragging(false);
    dragStartX.current = 0;
    dragCurrentX.current = 0;
  }, [isDragging]);

  // const distanceBetweenItems = isMobile ? 170 : 250;

  
  const carouselConfig = useMemo(() => ({
    itemCount: data.length,
    distanceBetweenItems: 250,
    initialIndex: Math.floor(data.length / 2),
    visibleRange: 2,
    autoPlay: false,
    autoPlayInterval: 3000,
    dragThreshold: 100,
  }), [data.length]);
  
  const {
    activeIndex,
    isAutoPlaying,
    toggleAutoPlay,
    goToIndex,
    getCarouselProps,
    getContainerProps,
    getItemProps,
    getNavigationProps,
    getDotProps,
  } = useCarousel(carouselConfig);

  useEffect(() => {
    setOpenItem(activeIndex)
    setOpenUnderTag(null)
  }, [activeIndex])
  
const handleClick = useCallback((index: number) => ({
    onMouseDown: (e: React.MouseEvent) => {
      handleDragStart(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => {
      isDragging && handleDragMove(e.clientX);
    },
    onMouseUp: (e: React.MouseEvent) => {
      handleDragEnd(index);
    },
    onTouchStart: (e: React.TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleDragMove(e.touches[0].clientX);
    },
    onTouchEnd: () => {
      handleDragEnd(index);
    },

  }), [isDragging, handleDragStart, handleDragMove, handleDragEnd]);

  return (
    <div className="w-screen flex items-center justify-center">
      <div className="w-full">
        <div {...getCarouselProps()} className="relative h-[400px] md:h-[500px] outline-none">
          <div {...getContainerProps()}>
            {data.map((item, index) => (
              <div {...handleClick(index)} key={item.id} {...getItemProps(index)}>
                <div className="space-y-5 md:space-y-10 flex flex-col items-center justify-center">
                  <div className="relative w-[350px] h-[250px] max-md:w-[170px] max-md:h-[170px]">
                    <img
                      src={item.image}
                      alt={dict.services[item.label as keyof typeof dict.services]}
                      className="object-cover h-full w-full"
                      draggable={false}
                    />
                  </div>
                  <h3 className="text-black text-center text-2xl max-md:text-[1rem] font-semibold absolute -bottom-5">{dict.services[item.label as keyof typeof dict.services]}</h3>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <button
            {...getNavigationProps('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 max-md:hidden"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            {...getNavigationProps('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 max-md:hidden"
          >
            <ChevronRight size={24} />
          </button>
        </div>

{/*         <div className="flex items-center justify-center gap-8">
          <div className="flex gap-2">
            {cardData.map((_, index) => (
              <button key={index} {...getDotProps(index)} />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}