'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// Types
interface CarouselItem {
  id: number;
  url: string;
  title: string;
}

interface useCarouselOptions {
  itemCount: number;
  distanceBetweenItems?: number;
  initialIndex?: number;
  visibleRange?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  dragThreshold?: number;
}

interface useCarouselReturn {
  activeIndex: number;
  isAutoPlaying: boolean;
  goToIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  toggleAutoPlay: () => void;
  getCarouselProps: () => {
    className: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    tabIndex: number;
    role: string;
    'aria-label': string;
  };
  getContainerProps: () => {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    className: string;
    style: React.CSSProperties;
  };
  getItemProps: (index: number) => {
    className: string;
    style: React.CSSProperties;
    'data-active': boolean;
    'data-visible': boolean;
  };
  getNavigationProps: (direction: 'prev' | 'next') => {
    onClick: () => void;
    className: string;
    'aria-label': string;
  };
  getDotProps: (index: number) => {
    onClick: () => void;
    className: string;
    'aria-label': string;
    'data-active': boolean;
  };
}

// Custom Hook
export function useCarousel({
  itemCount,
  distanceBetweenItems = 250,
  initialIndex = 2,
  visibleRange = 2,
  autoPlay = false,
  autoPlayInterval = 3000,
  dragThreshold = 50,
}: useCarouselOptions): useCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  

  const getPosition = useCallback((index: number) => {
    return index - activeIndex;
  }, [activeIndex]);

  const goToIndex = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setActiveIndex(index);
    }
  }, [itemCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Auto-play functionality
/*   useEffect(() => {
    if (isAutoPlaying && !isPaused && !isDragging) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, isDragging, goToNext, autoPlayInterval]); */

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    dragCurrentX.current = clientX;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentX.current - dragStartX.current;
    
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setIsDragging(false);
    dragStartX.current = 0;
    dragCurrentX.current = 0;
  }, [isDragging, dragThreshold, goToNext, goToPrevious]);

  const getCarouselProps = useCallback(() => ({
    className: 'perspective-1000',
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToIndex(itemCount - 1);
      }
    },
    tabIndex: 0,
    role: 'region',
    'aria-label': 'Image carousel',
  }), [goToPrevious, goToNext, goToIndex, itemCount]);

  const getContainerProps = useCallback(() => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleDragMove(e.clientX);
    },
    onMouseUp: () => {
      handleDragEnd();
    },
    onMouseLeave: () => {
      if (isDragging) handleDragEnd();
    },
    onTouchStart: (e: React.TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleDragMove(e.touches[0].clientX);
    },
    onTouchEnd: () => {
      handleDragEnd();
    },
    className: 'relative w-full h-full flex flex-col items-center justify-center',
    style: {
      userSelect: 'none' as const,
    },
  }), [isDragging, handleDragStart, handleDragMove, handleDragEnd]);

  const getItemProps = useCallback((index: number) => {
    const position = getPosition(index);
    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;
    const isVisible = Math.abs(position) <= visibleRange;

    return {
      className: `transition-all absolute duration-600 ease-out 
       ${isActive ? 'z-30' : isAdjacent ? 'z-20' : 'z-10'}`,
      style: {
        transform: `
          translateX(${position * distanceBetweenItems}px)
          translateZ(${-Math.abs(position) * 200}px)
          scale(${isActive ? 1 : 0.7 - Math.abs(position) * 0.15})
          rotateY(${position * 0}deg)
        `,
        opacity: isActive ? 1 : 0.5 - Math.abs(position) * 0.1,
        // display: isVisible ? 'block' : 'none',
        // pointerEvents: isDragging ? ('none' as const) : ('auto' as const),
      },
      'data-active': isActive,
      'data-visible': isVisible,
    };
  }, [activeIndex, visibleRange, goToIndex, getPosition, isDragging]);

  const getNavigationProps = useCallback((direction: 'prev' | 'next') => ({
    onClick: direction === 'next' ? goToNext : goToPrevious,
    className: 'bg-black/10 hover:bg-black/20 text-blakc rounded-full p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95',
    'aria-label': direction === 'next' ? 'Next image' : 'Previous image',
  }), [goToNext, goToPrevious]);

  const getDotProps = useCallback((index: number) => ({
    onClick: () => goToIndex(index),
    className: `w-2 h-2 rounded-full transition-all duration-300 ${
      index === activeIndex
        ? 'bg-(--theme) w-8'
        : 'bg-black/30 hover:bg-black/50'
    }`,
    'aria-label': `Go to image ${index + 1}`,
    'data-active': index === activeIndex,
  }), [activeIndex, goToIndex]);

  return {
    activeIndex,
    isAutoPlaying,
    goToIndex,
    goToNext,
    goToPrevious,
    toggleAutoPlay,
    getCarouselProps,
    getContainerProps,
    getItemProps,
    getNavigationProps,
    getDotProps,
  };
}