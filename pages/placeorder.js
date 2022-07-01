
import Layout from '../components/layout'

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../context/StoreContext';
import { getError } from '../utils/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';



const PlaceOrder = () => {
    const {data:session} = useSession()
    const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/order', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        session,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };
  return (
    <Layout title='Place Order'>
        <ToastContainer />
        <div className='min-h-screen pt-28 pb-10 px-10'>
            <div>
                <ul class="steps steps-vertical sm:steps-horizontal w-full">
                    <li class="step step-primary">Register</li>
                    <li class="step step-primary">Shipping Address</li>
                    <li class="step step-primary">Payment</li>
                    <li class="step">Place Order</li>
                </ul>
            </div>
                <h1 className="pl-4 my-4 text-2xl font-bold text-primary">Place Order</h1>
                {cartItems.length === 0 ? (
                    <div>
                    Cart is empty. <Link href="/">Go shopping</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3 space-y-4">
                        <div className="card glass p-5">
                        <h2 className="mb-2 text-lg card-title text-primary">Shipping Address</h2>
                        <div>
                            {shippingAddress.fullName}, {shippingAddress.address},{' '}
                            {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                            {shippingAddress.country}
                        </div>
                        <div className='btn w-20 mt-2'>
                            <Link href="/shipping">Edit</Link>
                        </div>
                        </div>
                        <div className="card glass p-5">
                            <h2 className="mb-2 text-lg card-title text-primary">Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div className='btn w-20 mt-2'>
                                <Link href="/payment">Edit</Link>
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
                                        src={item.imageUrl}
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
                        <div className='btn w-20 mt-2'>
                            <Link href="/cart">Edit</Link>
                        </div>
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
                            <button
                                disabled={loading}
                                onClick={placeOrderHandler}
                                className="btn btn-primary w-full"
                            >
                                {loading ? 'Loading...' : 'Place Order'}
                            </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
            )}
        </div>

    </Layout>
  )
}

export default PlaceOrder