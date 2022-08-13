import { BadgeCheckIcon, CurrencyRupeeIcon, HeartIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'


const Card = ({product}) => {

  return (
    <div className="card h-[80vh] w-[25rem] bg-base-300 shadow-xl">
        <div className='h-3/5 relative'>
            <Image src={product.ImageUrl} objectFit='cover'  layout="fill"  className='absolute' alt=""/>
            <div className='absolute bg-gradient-to-r from-primary to-secondary flex space-x-1 rounded-full p-3 text-white top-2 left-2'>
                <BadgeCheckIcon className='h-6 w-6'/>
                <div>Total Sale:</div>
                <CurrencyRupeeIcon className='h-6 w-6'/>
                <div>{product.Badge}</div>
            </div>
        </div>
        <div className="card-body flex flex-col justify-between">
            <div className='space-y-2'>
                <h2 className="card-title">{product.Title}</h2>
                <div className='card-title '>{product.Price}</div>
                <div className='flex space-x-2 '>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={product.Avatar} />
                        </div>
                    </div>
                    <div className='p-1'>{product.Author}</div>
                </div>
            </div>
            
            
            <div className="card-actions justify-between">
                <button className='flex space-x-1'>
                    <HeartIcon className='h-10 w-10 text-white'/>
                    <span className='p-2'>{product.Likes}</span>
                </button>
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default Card