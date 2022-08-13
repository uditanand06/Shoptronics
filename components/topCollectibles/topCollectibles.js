import React from 'react'

import ProductCard from '../productCard'

const TopCollectibles = ({products}) => {
  return (
    <div className='px-10 lg:px-14 space-y-6 md:space-y-10 py-20'>
        <div className='text-h1'>Top Collectibles</div>
        {/* <div className='flex justify-between'>
            <div>
                <select class="select select-primary w-46">
                    <option disabled selected>Sort By</option>
                    <option>Sales Volume</option>
                    <option>Most Likes</option>
                    <option>Most Views</option>
                </select>
            </div>
            <div>
                <select class="select select-primary w-46">
                    <option disabled selected>Show By</option>
                    <option>Today</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>All time</option>
                </select>
            </div>
        </div> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-20'>
            {products?.map((product) => (<ProductCard product={product} id={product.id} key={product.id} />))}
        </div>
    </div>
    
  )
}

export default TopCollectibles

