import React from 'react'
import Carousel from './carousel'

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center space-y-2 md:space-y-5'>
        <div className='text-3xl sm:text-5xl font-bold text-center w-full'> 
            Buy, sell and showcase NFTs
        </div>
        <div className='text-lg sm:text-2xl font-bold text-center w-full'>
            from leading creators and brands
        </div>
        <Carousel />
    </div>
  )
}

export default Hero