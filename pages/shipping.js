import React, { useContext, useEffect } from 'react'
import Layout from '../components/layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Store } from '../context/StoreContext';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import {  getSession } from "next-auth/react"

const ShippingPage = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress]);

   

    const onSubmit = async ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
          });
          Cookies.set(
            'cart',
            JSON.stringify({
              ...cart,
              shippingAddress: {
                fullName,
                address,
                city,
                postalCode,
                country,
              },
            })
          );
      
          router.push('/payment');
        
    }
  return (
    <Layout title='shipping'>
        <div className='h-screen pt-28 px-10'>
            <div>
                <ul className="steps steps-vertical sm:steps-horizontal w-full">
                    <li className="step step-primary">Register</li>
                    <li className="step step-primary">Shipping Address</li>
                    <li className="step">Payment</li>
                    <li className="step">Place Order</li>
                </ul>
            </div>
            <div>
                <div className='px-10 py-6 rounded-xl h-full w-full '>
                <ToastContainer />
                <div className='text-center w-full space-y-2 text-secondary'>
                    <div className='font-bold text-xl'>Shipping Address</div>
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
                    <div>
                        <input 
                                {...register("fullName",{required:true})}
                                type="fullName" 
                                placeholder="Your Name"
                                className="input w-full border border-primary "
                        />
                        {errors.name?.type==='required'&& <p className='error_text'>Name is required</p>}
                    </div>

                    <div>
                        <textarea 
                                {...register("address",{required:true})}
                                type="address" 
                                placeholder="Your Address..."
                                className="textarea textarea-primary w-full"
                        />
                        {errors.address?.type==='required'&& <p className='error_text'>Address is required</p>}
                    </div>

                    <div className="flex flex-col items-start">
                        <input 
                                {...register("city",{required:true})}
                                type="city" 
                                placeholder="City"
                                className="input w-full border border-primary "
                        />
                        {errors.city?.type==='required'&& <p className='error_text'>City is required</p>}
                    </div>

                    <div className="flex flex-col items-start">
                        <input 
                                {...register("postalCode",{required:true})}
                                type="postalCode" 
                                placeholder="Postal Code"
                                className="input w-full border border-primary "
                        />
                        {errors.postalCode?.type==='required'&& <p className='error_text'>Postal Code is required</p>}
                    </div>

                    <div className="flex flex-col items-start">
                        <input 
                                {...register("country",{required:true})}
                                type="country" 
                                placeholder="Country"
                                className="input w-full border border-primary "
                        />
                        {errors.country?.type==='required'&& <p className='error_text'>Country is required</p>}
                    </div>

                    <div>
                        <button onSubmit={onSubmit} className="btn btn-primary w-full px-6 py-3 rounded-lg ">
                            <span className="font-semibold text-lg">Submit</span>
                        </button>
                        
                    </div>
                    <input type="submit" className='hidden'/>
                </form>
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default ShippingPage

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    
    if (session?.user) {
    }else{
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
    }
    return {
      props: { },
    };
  }