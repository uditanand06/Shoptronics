import React, { useContext } from 'react'
import Layout from '../../components/layout'
import {useRouter} from 'next/router'
import Image from 'next/image';
import { CurrencyRupeeIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import AddButton from '../../components/addButton';

const ProductPage = ({product}) => {
    var stock
    if(product.countInstock<=0) stock=false
    else stock=true

    const {data:session} = useSession()
   
  return (
    <Layout title={product.brand}>
        <section className='min-h-screen pt-16'>
            <div className="absolute top-0 left-0 w-full h-full -z-10 ">
            <Image src='/wallpaper2.jpg' layout="fill" objectFit="cover"  />
            </div>
            <div className='min-h-[90vh] w-full p-10 flex flex-col space-y-4'>
                <Link href='/'><a>Back to products</a></Link>
                <div className='flex flex-grow flex-col md:flex-row p-4 glass_effect min-h-[80vh]'>
                    <div className='h-1/2 md:h-auto md:w-1/2  relative'>
                        <div className='absolute top-0 left-0 w-full h-full'>
                            <Image src={product.imageUrl} layout='fill' objectFit='cover' objectPosition='center' className='rounded-lg'/>
                        </div>
                    </div>
                    <div className='h-1/2 md:h-auto md:w-1/2 flex flex-col justify-between items-center p-4 space-y-4'>
                        <div className='border rounded-lg p-4 w-full glass-component'>
                            <h1 className='text-product'>{product.name}</h1>
                            <h1 className='text-product'>{`Category: ${product.category}`}</h1>
                            <h1 className='text-product'>{`Brand: ${product.brand}`}</h1>
                            <h1 className='text-product'>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </h1>
                            <h1 className='text-product'>{`Description: ${product.description}`}</h1>
                        </div>
                        <div className='border rounded-lg p-4 w-full space-y-2 glass-component'>
                            <div className='flex justify-between'>
                                <div className='text-product'>Price</div>
                                <div className='flex'>
                                    <div className=''>{product.price}</div>
                                    <CurrencyRupeeIcon className='h-6 w-6 p-0.5'/>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-product'>Status</div>
                                {stock?<div>In Stock</div>:<div>Out of Stock</div>}
                            </div>
                            <AddButton product={product}/>

                            
                        </div>
                    </div>
                </div>

                <div className='flex flex-col space-y-4 pt-10'>
                    <div className='font-bold text-2xl'>Customer Reviews</div>
                    <div className='font-normal text-lg'>
                        No reviews yet
                    </div>
                    <div>
                        <label for="my-modal-3" className="btn modal-button">Add Review</label>
                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label for="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                {
                                    session?(
                                        <>
                                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                                        </>
                                        
                                    ):(<>
                                        <h3 className="text-lg font-bold">Please Login first!</h3>
                                    </>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </section>
    </Layout>
  )
}

export default ProductPage

export async function getServerSideProps({query:{slug}}){
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/product?slug=${slug}`)
    const product = await res.json();
    return{
        props:{
            product:product[0],
        }
    }
}
