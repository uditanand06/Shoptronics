import React from 'react'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';
import { useAuth } from '../context/AuthContext';


const RegisterSide = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user,signup } = useAuth()
    const router = useRouter()
    const onSubmit = async ({name,email,password,confirmPassword}) => {
        if(password!==confirmPassword)
        {
            toast.error("Invalid Confirm Password");
            return;
        }
        try {
            await signup(email, password)
            
            router.push('/account/login')
          } catch (err) {
            toast.error(err.code)
            
          }
        
        
    }
    
  return (
    <div className='px-10 py-6 rounded-xl h-full w-full '>
        <ToastContainer />
        <div className='text-center w-full space-y-2 text-secondary'>
            <div className='font-bold text-xl'>Hey There!</div>
            <div className='font-bold text-xl'>Welcome to our community!</div>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div>
                <input 
                        {...register("name",{required:true})}
                        type="name" 
                        placeholder="Your Name"
                        className="input w-full border "
                />
                {errors.name?.type==='required'&& <p className='error_text'>Name is required</p>}
            </div>

            <div>
                <input 
                        {...register("email",{required:true})}
                        type="email" 
                        placeholder="Your Email"
                        className="input w-full border "
                />
                {errors.email?.type==='required'&& <p className='error_text'>Email is required</p>}
            </div>

            <div className="flex flex-col items-start">
                <input 
                        {...register("password",{required:true})}
                        type="password" 
                        placeholder="Password"
                        className="input w-full border "
                />
                {errors.password?.type==='required'&& <p className='error_text'>Password is required</p>}
            </div>

            <div className="flex flex-col items-start">
                <input 
                        {...register("confirmPassword",{required:true})}
                        type="password" 
                        placeholder="Confirm Password"
                        className="input w-full border "
                />
                {errors.confirmPassword?.type==='required'&& <p className='error_text'>Confirm Password is required</p>}
            </div>

            <div>
                <button onSubmit={onSubmit} className="btn btn-primary w-full px-6 py-3 rounded-lg ">
                    <span className="font-semibold text-lg">Sign Up</span>
                </button>
                
            </div>
            <div>
                <Link href='/account/login'>
                        <a className='text-sm link pt-2'>
                            Already have an account?
                        </a>
                </Link>
            </div>
            

            <input type="submit" className='hidden'/>
        </form>
    </div>
  )
}

export default RegisterSide