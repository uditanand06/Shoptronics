import React, { useContext } from 'react'
import { Store } from '../context/StoreContext'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddButton = ({product}) => {
    var stock
    if(product.countInstock<=0) stock=false
    else stock=true
    const {state,dispatch} = useContext(Store);
    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        toast.success('Product updated in the cart');
        
      };
  return (
    <>
        <ToastContainer />
        <div className={`btn btn-primary ${!stock && 'btn-disabled'}`} onClick={addToCartHandler}>Add to cart</div>
    </>
    
  )
}

export default AddButton