
import AnimatedBox from '@/components/ui/AnimatedBox';
import { useDataStore } from '@/stores/dataStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { CardType, Tag, UnderTag } from '@/types/types';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import CartButton from '../../_ProductCard/components/CartButton';
import { RequestPopup } from '@/app/[lang]/_components/RequestPopup';
  
const CategoryDropdown: React.FC = () => {

  const listRef = useRef<HTMLDivElement>(null!)

  const { tags } = useDataStore()
  const { dict, isRTL, lang } = useSettingsStore()

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTagOpen, setIsTagOpen] = useState<boolean>(false);
  const [tagHover, setTagHover] = useState<Tag | null>(null)
  // const [isUnderTagOpen, setIsUnderTagOpen] = useState<boolean>(false);
  const [underTagHover, setUnderTagHover] = useState<UnderTag | null>(null)

  const handleEnterTag = (tag: Tag) => {
    setTagHover(tag)
    setIsTagOpen(true)
    setUnderTagHover(null)
  }
  const handleEnterUnderTag = (underTag: UnderTag) => {
    setUnderTagHover(underTag)
  }
  
  const handleMouseLeave = () => {
    setIsOpen(false)
    setIsTagOpen(false)
    setUnderTagHover(null)
    setTagHover(null)
  }

  return (
        <div className='hidden md:block'>
          <div onMouseLeave={handleMouseLeave} className={`relative z-10 h-full flex flex-col 
              ${isRTL ? "" : "items-start"}
            `}
          >
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              className={`p-1 text-[16px] h-full focus:outline-none transition-colors duration-200 cursor-pointer`}
                >
              <div 
                className={`flex items-center gap-3
                  ${isRTL ? "flex-row-reverse" : "flex-row"}
                `}
              >
                <span
                  className={`flex items-center gap-1
                    ${isRTL ? "flex-row-reverse" : "flex-row"}
                  `}
                >
                  <BiCategory
                    className={`w-4 h-4 transition-transform duration-200
                      ${isOpen ? 'rotate-180' : 'rotate-0'}
                      `}
                    />
                  <span className="block truncate">
                    {dict.categories}
                  </span>
                </span>
                <span className='text-[12px] text-[#8f8f8f]'>|</span>
              </div>
            </button>
            {isOpen &&
              <AnimatedBox className=''>
                <div
                  className={`absolute top-full ${isRTL ? "right-0" : ""} border-t border-neutral-200 flex max-w-[70vw] min-h-[30vh]
                    ${isRTL ? "flex-row-reverse" : "flex-row"}
                  `}
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <div className='bg-[#e7e7e7]'>
                    {tags.map((tag: Tag, i: number) => (
                      <p
                        key={tag.id}
                        className={`flex items-center gap-2 truncate px-6 py-6 cursor-pointer border-x border-[#c7c7c7]
                          ${tagHover === tag ? "bg-white text-(--theme)" : null}
                          ${i !== tags.length - 1 ? "border-b" : null}
                          ${isRTL ? "flex-row-reverse" : "flex-row"}
                        `}
                        onMouseEnter={() => handleEnterTag(tag)}
                      >
                        {dict.services[tag.label as keyof typeof dict.services]}
                      </p>
                    ))}
                  </div>
                  <div className='bg-[#e7e7e7]'>
                    {tagHover && tagHover.underTags.map((underTag: UnderTag, i: number) => (
                      <div  key={underTag.id} className='w-full'>
                        <RequestPopup buttonClassName={'w-full'} popupClassName='top-[calc(50vh)] -translate-y-1/2 bg-[#00000000]' buttonContent={
                          <div className={`${underTagHover === underTag ? "bg-white text-(--theme)" : null} flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                            <div 
                              className={`flex items-center gap-2 truncate px-6 py-6 cursor-pointer
                                
                                ${isRTL ? "flex-row-reverse" : "flex-row"}
                              `}
                              onMouseEnter={() => handleEnterUnderTag(underTag)}
                            >
                              {dict.services[underTag.label as keyof typeof dict.services]}
                            </div>
                            {underTagHover && 
                            <div className={`flex items-center justify-center px-2 ${isRTL ? "pl-5" : "pr-5"}`}>
                              <CartButton type={CardType.UnderTag}/>
                            </div>}
                          </div>
                        }/>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedBox>
            }
          </div>
          {isOpen && <div className='fixed top-[47px] left-0 w-full h-screen bg-[#000000c0] z-9'></div>}
        </div>
  );
};

export default CategoryDropdown;