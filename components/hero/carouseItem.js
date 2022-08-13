import Image from 'next/image'
import React from 'react'
import {CalendarIcon} from '@heroicons/react/outline'

const CarouselItem = ({item}) => {
    var prev
    if(item.Id===1) prev=3;
    else prev=item.Id-1;
    var next
    if(item.Id===3) next=1;
    else next=item.Id+1;
  return (
   
      // <div id={`slide${item.Id}`} class="carousel-item relative w-full">
      //     <div>
      //         <Image src={item.ImageSrc} layout="fill" objectFit='cover' className='brightness-50'/>
      //     </div>
      //     <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-10">
      //       <a href={`#slide${prev}`} class="btn btn-circle">❮</a> 
      //       <a href={`#slide${next}`} class="btn btn-circle">❯</a>
      //     </div>
      //     <div className='absolute w-full  text-center space-y-4 top-10 md:top-[9rem] lg:top-16'>
      //       <button className='btn-custom rounded-3xl space-x-2'>
      //         <span className='w-6 h-6'><CalendarIcon /></span>
      //         <div>Upcoming</div>
      //       </button>
      //       <div className='text-white font-medium tracking-wide text-lg md:text-xl'>{item.Date}</div>
      //       <div className='font-bold text-2xl md:text-4xl text-white tracking-wide'>{item.Title}</div>
      //       <div className='text-primary font-semibold tracking-wide text-lg md:text-2xl'>{item.Author}</div>
      //       <button className='btn-custom'>
      //         <div>View Drop</div>
      //       </button>
      //     </div>

      // </div>

      <div className={`carousel-item ${item.Id===1 && 'active'} float-left w-full`}>
          <Image src={item.ImageSrc} layout="fill" objectFit='cover' className='brightness-50 block w-full'/>
          <div className='absolute w-full  text-center space-y-4 top-10 md:top-[9rem] lg:top-16'>
            <button className='btn-custom rounded-3xl space-x-2'>
              <span className='w-6 h-6'><CalendarIcon /></span>
              <div>Upcoming</div>
            </button>
            <div className='text-white font-medium tracking-wide text-lg md:text-xl'>{item.Date}</div>
            <div className='font-bold text-2xl md:text-4xl text-white tracking-wide'>{item.Title}</div>
            <div className='text-primary font-semibold tracking-wide text-lg md:text-2xl'>{item.Author}</div>
            <button className='btn-custom'>
              <div>View Drop</div>
            </button>
          </div>
      </div>
   
    

  )
}

export default CarouselItem