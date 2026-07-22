"use client"
import { useMainCarousel } from '@/hooks/useMainCarousel'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import AutoCarouselBelt from './components/AutoCarouselBelt'

const MainAdvertiseSec = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
      const handleResize = () => {
      setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const {
    currentIndex,
    isPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    play,
    pause,
    toggle,
    getSliderProps,
    getSlidesContainerProps,
    getSlideProps,
    getDotProps,
    getArrowProps,
    progress
  } = useMainCarousel({
    itemCount: 3,
    autoPlay: true,
    autoPlayDelay: 5000,
    loop: true,
    startIndex: 0,
  })
  
    const currentX = useRef(0);
    const currentY = useRef(0);
    const clientX = useRef(0);
    const clientY = useRef(0);
    const container = useRef<HTMLDivElement>(null!);
    const [rotationX, setRotationX] = useState(0)
    const [rotationY, setRotationY] = useState(0)

  const handleRotation = useCallback((ClientX: number, ClientY: number) => {
    const rect = container.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = ClientX - centerX;
        const deltaY = ClientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
        const rotationLimit = 20;
        const rotationX = (deltaX / maxDistance) * rotationLimit;
        const rotationY = (deltaY / maxDistance) * rotationLimit;
        setRotationX(-rotationX);
        setRotationY(-rotationY);
  }, [])
  
  const handleMovement = useCallback(() => ({
    onMouseMove: (e: React.MouseEvent) => {
      handleRotation(e.clientX, e.clientY)
    },
    onMouseLeave: () => {
      setRotationX(0)
      setRotationY(0)
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleRotation(e.touches[0].clientX, e.touches[0].clientY)
    },
    onTouchEnd: () => {
      setRotationX(0)
      setRotationY(0)
    }
  }), []);

  

  return (
    <div ref={container} className={`flex flex-col items-center justify-center gap-5 bg-white`}>
      <div {...getSliderProps()} className='relative overflow-hidden max-md:m-3'>
        <div {...getSlidesContainerProps()}>
            <div {...getSlideProps(0)} className='h-40 md:h-60 min-w-full relative flex justify-center items-center max-md:rounded-2xl overflow-hidden'>
                <Image className='max-md:rounded-2xl' src={'/images/blackCircuitBoard2.jpg'} width={screenWidth} height={1} alt={''} />
                <div className='absolute top-0 left-0 max-md:rounded-2xl bg-black/40 min-h-full min-w-full'></div>
            </div>
            <div {...getSlideProps(1)} className='h-40 md:h-60 min-w-full relative flex justify-center items-center max-md:rounded-2xl overflow-hidden'>
                <Image className='max-md:rounded-2xl' src={'/images/repairShop.jpg'} width={screenWidth} height={1} alt={''} />
                <div className='absolute top-0 left-0 max-md:rounded-2xl bg-black/40 min-h-full min-w-full'></div>
            </div>
            <div {...getSlideProps(2)} className='h-40 md:h-60 min-w-full relative flex justify-center items-center max-md:rounded-2xl overflow-hidden'>
                <Image className='max-md:rounded-2xl' src={'/images/20260530_102801.jpg'} width={screenWidth} height={1} alt={''} />
                <div className='absolute top-0 left-0 max-md:rounded-2xl bg-black/40 min-h-full min-w-full'></div>
            </div>
        </div>
        <div className='absolute bottom-10 right-10 w-30 hidden md:block'>
            <button {...getArrowProps('prev')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button {...getArrowProps('next')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <button {...getDotProps(0)} />
            <button {...getDotProps(1)} />
            <button {...getDotProps(2)} />
        </div>
      </div>
      <AutoCarouselBelt/>
    </div>
  )
}

export default MainAdvertiseSec
