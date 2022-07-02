
import Link from 'next/link'
import React, { useContext, useState,useEffect } from 'react'
import { themeChange } from 'theme-change'
import {useSession,signOut} from 'next-auth/react'
import { useAuth } from '../context/AuthContext'
import { Store } from '../context/StoreContext'
import Cookies from 'js-cookie';


const Navbar = () => {

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);
    
    const {user,logout} = useAuth()

    const {data:session} = useSession()

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
      }, [])

      const handleSignOut = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut();
        logout();
    }
      
  return (

    <div className="navbar bg-base-300 fixed z-30">
        <div className="flex-1">
            <Link href='/'>
                <a className="btn btn-primary btn-ghost normal-case text-xl">Shoptronics</a>
            </Link>
        </div>
        <div className="flex-none space-x-5">
            
            <Link href="/cart">
                <a className="p-2 btn btn-ghost normal-case text-xl">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
            </Link>
            <div className="form-control hidden md:flex">
                <input type="text" placeholder="Search" className="input input-bordered" />
            </div>
            {session || user?(
                <div className="dropdown dropdown-end">
                    <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=33791" />
                        </div>
                    </label>
                    <ul tabindex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52">
                        <li>
                            <Link href='/account/dashboard'>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </Link>  
                        </li>
                        <li><Link href='/'><a>Settings</a></Link></li>
                        <li><Link href='/'><button onClick={() => handleSignOut()}>Logout</button></Link></li>
                    </ul>
                </div>
            ):(
                <button className='btn btn-primary'>
                    <Link href='/account/login'>
                        <a>Login</a>
                    </Link>
                </button>
            )}
            <select data-choose-theme className="select max-x-xs">
                <option disabled selected>Select Theme</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="cupcake">Cupcake</option>
                <option value="night">Night</option>
            </select>
        </div>
    </div>
  )
}

export default Navbar