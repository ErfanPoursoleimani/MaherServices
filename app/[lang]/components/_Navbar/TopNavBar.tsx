'use client'
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useSettingsStore } from '@/stores/settingsStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CategoryDropdown from './components/CategoryDropdown';
import LanguageDropdown from './components/LanguageDropdown';
import SearchBar from './components/SearchBar';




const DesktopNavBar = ({ className }: { className: string }) => {

  const { lang } = useParams()
  const { dict, isRTL } = useSettingsStore()
  const { logo } = dict

  const isBodyVisible = useScrollDirection(100);
  const isFooterVisible = useScrollDirection(100);
  
  
  return (
    <>
      <nav className={`
        ${className}
        flex flex-col justify-center z-104 items-stretch fixed w-full ${!isBodyVisible ? 'border-b' : ""} border-[#7979793f] text-(--dark-text) md:bg-(--background) backdrop-blur-[5px] top-0 z-103 lg:px-[10%] px-3 pt-3 ${!isFooterVisible ? "pb-3" : "max-md:pb-3"}
        `}
      >
        <div
          className='flex justify-between gap-4 items-center'
          style={{
            flexDirection: isRTL ? 'row' : 'row-reverse'
          }}
          >
          <div
            className='flex gap-6 items-center justify-center h-full'
            style={{
              flexDirection: isRTL ? 'row' : 'row-reverse'
            }}
          >
            <LanguageDropdown />
          </div>
          <div
            className='flex justify-stretch items-center flex-1 gap-5'
            style={{
              flexDirection: !isRTL ? 'row' : 'row-reverse'
            }}
          >
            <Link href={`/${lang}`} className={`font-extrabold text-transparent text-xl xl:text-2xl hidden md:inline-block ${isRTL ? "max-xl:text-[18px]" : null}`}
              style={{
                background: 'linear-gradient(-90deg, #000, #279FF5, #000, #279FF5, #000)',
                backgroundSize: '300% 300%',
                backgroundClip: 'text',
                animation: 'gradientShift 6s ease infinite'
                }}
            >
            <style>{`
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            `}</style>
              {logo}
            </Link>
            <SearchBar />
          </div>
        </div>
      </nav>
      <nav className={`
        ${className}
        flex flex-col top-[54px] justify-center items-between lg:px-[10%] px-3 items-stretch gap-2 h-12 fixed w-screen shadow-xs max-md:hidden text-(--dark-text) md:bg-(--background) backdrop-blur-[5px] md:z-103 z-102 ${isFooterVisible ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300
        `}
      >
        <CategoryDropdown />
      </nav>
    </>
  )
}

export default DesktopNavBar