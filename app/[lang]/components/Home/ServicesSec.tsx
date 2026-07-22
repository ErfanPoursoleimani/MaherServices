'use client'
import AnimatedBox from "@/components/ui/AnimatedBox"
import { useDataStore } from "@/stores/dataStore"
import { useState } from "react"
import DepthCarousel from "./components/DepthCarousel"
import UnderTagsSec from "./components/UnderTagsSec"
import ProductsSec from "./components/ProductsSec"

const ServicesSec = () => {
  
    const { tags } = useDataStore()
    const [openTag, setOpenTag] = useState(Math.floor((tags.length - 1) / 2))
    const [openUnderTag, setOpenUnderTag] = useState(null)
    
  return (
    <div id="undertagsList" className="flex flex-col items-center gap-10">
        <AnimatedBox className='' animation="slideUp" config={{delay: 0.2}}>
            <DepthCarousel data={tags} setOpenItem={setOpenTag} setOpenUnderTag={setOpenUnderTag}/>
        </AnimatedBox>
        <div id="productsList" className="max-w-screen min-h-80 md:min-h-100 md:max-w-4/5 -mt-20 flex flex-col items-center justify-between">
          <UnderTagsSec openItem={openTag} setOpenUnderTag={setOpenUnderTag} />
          <ProductsSec openUnderTag={openUnderTag} openTag={openTag} />
        </div>
    </div>
  )
}

export default ServicesSec
