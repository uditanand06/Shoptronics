import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Layout from '../../components/layout'
import { API_URL } from '../../config'


const OrderPage = ({order:{shippingAddress,paymentMethod,orderItems:cartItems,itemsPrice,taxPrice,shippingPrice,totalPrice,id,isDeleivered,isPaid}}) => {


    const router = useRouter()
    useEffect(() => {
        //router.reload(window.location.pathname)
    },[isPaid])

    const handleCheckout = async (paymentInfo) => {
        if(paymentInfo)
        {
            try {
                const res = await axios({
                    method: 'put',
                    url: `/api/order?id=${id}`,
                    data: {
                        isPaid:true,
                    }
                });
                //console.log(res)
                if(res.statusText==='OK')
                router.reload(window.location.pathname)
            } catch (err) {
                if (err.response.status === 404) {
                    console.log('Resource could not be found!');
                } else {
                    console.log(err.message);
                }
            }
        }
    }
  
  
    return (
    <Layout title='order'>
      <div className='min-h-screen pt-28 pb-10 px-10'>
            <div className='text-2xl text-primary font-semibold mb-6'>
                {`Order ${id}`}
            </div>
                
                    <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3 space-y-4">
                        <div className="card glass p-5">
                        <h2 className="mb-2 text-lg card-title text-primary">Shipping Address</h2>
                        <div>
                            {shippingAddress.fullName}, {shippingAddress.address},{' '}
                            {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                            {shippingAddress.country}
                        </div>
                        <div className={`btn font-light cursor-default mt-2 ${isDeleivered?'btn-success':'btn-error'}`}>
                            {isDeleivered?'Deleivered':'Not Deleivered'}
                        </div>
                        </div>
                        <div className="card glass p-5">
                            <h2 className="mb-2 text-lg card-title text-primary">Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div className={`btn font-light cursor-default mt-2 ${isPaid?'btn-success':'btn-error'}`}>
                                {isPaid?'Paid':'Not Paid'}
                            </div>
                        </div>
                        <div className="card glass overflow-x-auto p-5">
                        <h2 className="mb-2 text-lg card-title text-primary">Order Items</h2>
                        <table className=" table">
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                      
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                <td>
                                    <Link href={`/product/${item.slug}`}>
                                    <a className="flex items-center">
                                        <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        ></Image>
                                        &nbsp;
                                        {item.name}
                                    </a>
                                    </Link>
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>
                                    ${item.quantity * item.price}
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                       
                        </div>
                    </div>
                    <div>
                        <div className="card glass  p-5">
                        <h2 className="card-title text-primary mb-2 text-lg">Order Summary</h2>
                        <ul>
                            <li>
                            <div className="mb-2 flex justify-between">
                                <div>Items</div>
                                <div>${itemsPrice}</div>
                            </div>
                            </li>
                            <li>
                            <div className="mb-2 flex justify-between">
                                <div>Tax</div>
                                <div>${taxPrice}</div>
                            </div>
                            </li>
                            <li>
                            <div className="mb-2 flex justify-between">
                                <div>Shipping</div>
                                <div>${shippingPrice}</div>
                            </div>
                            </li>
                            <li>
                            <div className="mb-2 flex justify-between">
                                <div>Total</div>
                                <div>${totalPrice}</div>
                            </div>
                            </li>
                            <li>
                            {
                                isPaid?<></>:
                                <StripeCheckout
                                name="Shoptronics"
                                amount={totalPrice*100}
                                currency="INR"
                                image={cartItems[0].image}
                                stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                                token={(paymentInfo) => handleCheckout(paymentInfo)}
                                
                                >
                                    <button className="btn btn-primary w-full">
                                        Checkout
                                    </button>
                                </StripeCheckout>
                            }
                            
                            
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
            
        </div>
    </Layout>
  )
}

export default OrderPage

export async function getServerSideProps({query:{id}}){
  const res = await fetch(`${API_URL}/order?id=${id}`);
  const order = await res.json();
  return{
    props:{
      order:order
    }
  }
}