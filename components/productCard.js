import { BadgeCheckIcon, CurrencyRupeeIcon, HeartIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import AddButton from './addButton'

const ProductCard = ({product}) => {
    var stock
    if(product.countInstock<=0) stock=false
    else stock=true

    
    

    return (
        <div class="card h-[80vh] w-[25rem] bg-base-300 shadow-xl">
            <div className='h-3/5 relative'>
                <Link href={`/product/${product.slug}`}><a><Image src={product.imageUrl} objectFit='cover'  layout="fill"  className='absolute'/></a></Link>
                <div className='absolute bg-gradient-to-r from-primary to-secondary flex space-x-1 rounded-full p-3 text-white top-2 left-2'>
                    <BadgeCheckIcon className={`h-6 w-6 ${stock?'text-green-600':'text-red-500'}`}/>
                    {
                        stock?(<>
                                
                                <div>In Stock:</div>
                                <div>{product.countInstock}</div>
                            </>):(<div>Out of Stock</div>)
                    }
                </div>
            </div>
            <div class="card-body flex flex-col justify-between">
                <div className='space-y-2'>
                    <h2 class="card-title">{product.brand}</h2>
                    <div className='card-title'>
                        <CurrencyRupeeIcon className='w-6 h-6'/>
                        <div>{product.price}</div>
                    </div>
                    
                    <div className='flex space-x-2 '>
                        <div className='p-1'>{product.name}</div>
                    </div>
                </div>
                
                
                <div class="card-actions justify-between">
                    <button className='flex space-x-1'>
                        <HeartIcon className='h-10 w-10 text-white'/>
                    </button>
                    <AddButton product={product}>Add to Cart</AddButton>
                </div>
            </div>
        </div>
      )
}

export default ProductCard