'use client'

import { useSettingsStore } from "@/stores/settingsStore"


const SmallLogo = ({ style }: { style: {}}) => {

  const { dict } = useSettingsStore()


  return (
    <span 
      className='1484:hidden font-bold'
      style={ style }
    >
        { dict.logo }
    </span>
  )
}

export default SmallLogo
