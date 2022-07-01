import { ArrowCircleDownIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

import { useRef, useState } from 'react'
import RoundThumbnail from './roundThumbnail'


function RoundCarousel({ title, movies }) {
  const rowRef = useRef(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div>
        <div className='flex space-x-2 justify-end'>
            <span className='rounded-full bg-base-300 p-1'><ChevronLeftIcon className='h-10 w-10 text-primary' onClick={() => handleClick('left')}/></span>
            <span className='rounded-full bg-base-300 p-1'><ChevronRightIcon className='h-10 w-10 text-primary' onClick={() => handleClick('right')}/></span>
        </div>
        <div className="flex items-center overflow-x-scroll scrollbar-hide md:space-x-5 md:p-2 max-w-[90vw]" ref={rowRef}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((num) => (
            <RoundThumbnail key={num} />
            ))}
        </div>
    </div>
    
   
        
  )
}

export default RoundCarousel