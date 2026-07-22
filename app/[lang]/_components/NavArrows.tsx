import React, { RefObject, useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const NavArrows = ({list}: {list: RefObject<HTMLDivElement>}) => {
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollOfsetWidth, setScrollOfsetWidth] = useState(0);

/*   useEffect(() => {
    const element = list.current;

    const handleScroll = () => {
      setScrollPosition(element.scrollLeft);
    };
    const handleResize = () => {
      setScrollWidth(element.scrollWidth);
      setScrollOfsetWidth(element.offsetWidth);
    };
    
    if (element) {
    element.addEventListener('scroll', handleScroll);
    element.addEventListener('resize', handleResize);
    return () => {
      element.removeEventListener('scroll', handleScroll);
      element.removeEventListener('', handleResize);
    }
    }
  }, []); */


  if (!list.current) return;

  return (
    <div className={`hidden ${scrollOfsetWidth === scrollWidth ? "md:block" : null}`} >
        <button className={`${scrollPosition === scrollOfsetWidth ? "hidden" : null} absolute p-3 backdrop-blur-3xl bg-[#000000bb] text-[15px] text-white rounded-full top-[50%] right-4 -translate-y-[50%]`}><MdArrowForwardIos /></button>
        <button className={`${scrollPosition === 0 ? "hidden" : null} absolute p-3 backdrop-blur-3xl bg-[#000000bb] text-[15px] text-white rounded-full top-[50%] left-4 -translate-y-[50%]`}><MdArrowBackIos /></button>
    </div>
  )
}

export default NavArrows
