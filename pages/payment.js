
import Layout from '../components/layout'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Store } from '../context/StoreContext';



const PaymentScreen = () => {
    

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <Layout title='payment'>
        <div className='h-screen pt-28 px-10'>
            <div>
                <ul className="steps steps-vertical sm:steps-horizontal w-full">
                    <li className="step step-primary">Register</li>
                    <li className="step step-primary">Shipping Address</li>
                    <li className="step step-primary">Payment</li>
                    <li className="step">Place Order</li>
                </ul>
            </div>
            <form className="mx-auto max-w-screen-md mt-20 form-control" onSubmit={submitHandler}>
                <h1 className="mb-4 text-2xl font-bold">Payment Method</h1>
                {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                <div key={payment} className="mb-4 label cursor-pointer">
                    <input
                    name="paymentMethod"
                    className="p-2 radio radio-primary"
                    id={payment}
                    type="radio"
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                    />

                    <label className="p-2 label-text" htmlFor={payment}>
                    {payment}
                    </label>
                </div>
                ))}
                <div className="mb-4 flex justify-between">
                <button
                    onClick={() => router.push('/shipping')}
                    type="button"
                    className="btn"
                >
                    Back
                </button>
                <button className="btn btn-primary">Next</button>
                </div>
            </form>
        </div>
        
    </Layout>
  )
}

export default PaymentScreen