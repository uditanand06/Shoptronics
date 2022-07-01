

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Store } from '../context/StoreContext';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

function CartScreen() {
    const {data:session} = useSession()
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/product?id=${item.id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  const handleSubmit = () => {
    if(session)
    {
        router.push('/shipping')
    }else{
        toast.error('Please login first!')
       // router.push('/account/login')
    }
  }
  return (
    <Layout title="Shopping Cart">
        <ToastContainer />
        <div className='min-h-screen p-20'>
            <h1 className="mb-4 text-4xl">Shopping Cart</h1>
        {cartItems.length === 0 ? (
            <div>
            Cart is empty. <Link href="/">Go shopping</Link>
            </div>
        ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
                <table className="min-w-full table">
                <thead>
                    <tr>
                    <th >Item</th>
                    <th >Quantity</th>
                    <th >Price</th>
                    <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                    <tr key={item.slug}>
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
                        <td >
                        <select
                            className='select select-success'
                            value={item.quantity}
                            onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                            }
                        >
                            {[...Array(item.countInstock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        </td>
                        <td>Rs: {item.price}</td>
                        <td>
                        <button onClick={() => removeItemHandler(item)}>
                            <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="card p-5">
                <ul>
                <li>
                    <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : Rs : 
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                </li>
                <li>
                    <button
                    onClick={handleSubmit}
                    className="btn btn-primary w-full"
                    >
                    Check Out
                    </button>
                </li>
                </ul>
            </div>
            </div>
        )}
        </div>
      
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
