'use client'
import Loading from '@/app/[lang]/_components/Loading'
import Popup from '@/app/[lang]/_components/PopupRaw'
import { usePopup } from '@/hooks/usePopup'
import { useDataStore } from '@/stores/dataStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { ReactNode } from 'react'

const CONTACT_NUMBER = '09130232357';
const CONTACT_NUMBER_INTL = '+989130232357';

export const RequestPopup = ({buttonClassName, popupClassName, buttonContent}: {buttonClassName: string, popupClassName?: string, buttonContent: ReactNode}) => {
  const popup = usePopup()
  const { loading } = useDataStore()
  const { isRTL, dict, lang } = useSettingsStore()

  const handleClick = () => {
    popup.closePopup()
  }



  return (
    <>
      <button
      disabled={loading}
      className={`${buttonClassName}`}
      onClick={() => popup.openPopup({ title: dict.requestService, variant: 'default' })}
      >
        
        { loading
          ? <Loading className={`text-white`} />
          : buttonContent
        }

      </button>
      <Popup popup={popup} className={`${popupClassName} top-0 left-0 z-104 text-neutral-800`}>
        <form onSubmit={handleClick}>
          <div className={`flex flex-col gap-5 md:text-sm text-[0.8rem] mb-20`}>
            <div className='flex flex-col items-center justify-center space-y-10'>
              <p className={`px-1 ${isRTL ? 'self-end' : "self-start"}`}>{dict.pleaseContactTheNumberBellow}</p>
              <p className={`px-1 self-center text-2xl`}>{lang === "fa" ? CONTACT_NUMBER : CONTACT_NUMBER_INTL}</p>
            </div>
          </div>
          <div className={`max-md:fixed bg-white bottom-11 md:bottom-0 left-0 w-full border-t p-4 border-neutral-300 z-103`}>
            <button className={`bg-(--theme) p-3 w-full rounded-[7px] text-white text-[1rem]`}>
              {dict.close}
            </button>
          </div>
        </form>
      </Popup>
    </>
  )
}