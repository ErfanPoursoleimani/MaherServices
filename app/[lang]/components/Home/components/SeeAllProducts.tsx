
import { useDataStore } from '@/stores/dataStore'
import { useSettingsStore } from '@/stores/settingsStore'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const SeeAllProducts = ({ arrowDirection }: { arrowDirection: string}) => {

  const { lang } = useParams()

  return (
    <Link 
      href={`/${lang}/products`}
      className='xl:min-w-50 xl:min-h-80 md:min-w-45 md:min-h-70 min-h-50 min-w-35 rounded-[7px] flex flex-col items-center justify-center gap-5 bg-(--theme2) text-white'
/*       style={
        arrowDirection === 'toLeft' ? {marginRight: '5px'} : {marginLeft: '5px'}
      } */
      >
      {arrowDirection === 'toLeft' 
      ? <MdArrowBackIos className='text-[60px] p-3 rounded-full border-2 border-white' /> 
      :  <MdArrowForwardIos className='text-[60px] p-3 rounded-full border-2 border-white'/>}
      <p className='text-[15px]'>دیدن همه</p>
    </Link>
  )
}

export default SeeAllProducts
