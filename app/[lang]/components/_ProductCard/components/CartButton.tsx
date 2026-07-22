'use client'
import { useSettingsStore } from '@/stores/settingsStore'
import { CardType } from '@/types/types'
import React from 'react'

const CartButton = ({type}: {type: CardType}) => {
  const { dict } = useSettingsStore()
  const isSmall   = type === CardType.UnderTag || type === CardType.Product
  const ctaContent = dict.request
  return (
    <span className="w-full rounded-full bg-cyan-100 flex items-center justify-center px-3 py-2">
      <p className={`text-neutral-500 font-medium whitespace-nowrap ${isSmall ? 'text-[0.6rem] md:text-[0.75rem]' : 'text-[0.7rem] md:text-[0.85rem]'}`}>
        {ctaContent}
      </p>
    </span>
  )
}

export default CartButton
