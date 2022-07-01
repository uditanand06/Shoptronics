import Layout from "../../components/layout"
import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form";
import {  getSession, signIn } from "next-auth/react"
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";




const Login = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { login,user } = useAuth()
  const onSubmit = async ({email,password}) => {
    try {
      await login(email,password)
      router.push('/')
    } catch (error) {
      toast.error(error.code)
    }
  }
  return (
    <Layout title="login">
      <ToastContainer />
      <div className="h-screen flex justify-center items-center ">
        <div className="absolute top-0 left-0 w-full h-full -z-10 ">
          <Image src='/wallpaper2.jpg' layout="fill" objectFit="cover"  />
        </div>
        <div className="mt-[100px] mb-[20px] md:m-auto flex md:w-3/4 md:h-3/4 p-4 glass_effect">
            <div className="w-full hidden md:flex  bg-[#B253F7] rounded-xl p-2">
              <Image src='/login.svg' height={600} width={500}  />
            </div>
            <div className="w-full">
              <div className='px-10 py-6 rounded-xl h-full w-full '>
                <div className='text-center w-full space-y-2 text-secondary'>
                  <div className='font-bold text-xl'>Hello Again!</div>
                  <div className='font-semibold'>Welcome back you have been missed!</div>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  
                  <button onClick={() => signIn('google')} className="h-12 px-6 border border-blue-100 rounded-lg bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200">
                    <div className="flex items-center space-x-4 justify-center">
                        <img src="/google.svg" className="w-8" alt=""/>
                        <span className="block w-max font-medium tracking-wide text-sm text-blue-700">with  Google</span>
                    </div>
                  </button>
                  <button onClick={() => signIn('github')} className="h-12 px-6 rounded-lg bg-gray-900 transition hover:bg-gray-800 active:bg-gray-600 focus:bg-gray-700">
                    <div className="flex space-x-4 items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        <span className="block w-max font-medium tracking-wide text-sm text-white">with Github</span>
                    </div>
                  </button>
                  
                </div>

                <div role="hidden" className="mt-12 border-t">
                    <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white rounded-full">Or</span>
                </div>

                <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-6">
                  <div>
                      <input 
                              {...register("email",{required:true})}
                              type="email" 
                              placeholder="Your Email"
                              className="input w-full"
                      />
                      {errors.email?.type==='required'&& <p className='error_text'>Email is required</p>}
                  </div>
                  <div className="flex flex-col items-start">
                      <input 
                              {...register("password",{required:true})}
                              type="password" 
                              placeholder="What's the secret word ?"
                              className="input w-full"
                      />
                      {errors.email?.type==='required'&& <p className='error_text'>Password is required</p>}
                      
                  </div>
                  <div>
                      <button className="btn btn-primary w-full px-6 py-3 rounded-lg ">
                          <span className="font-semibold text-lg">Login</span>
                      </button>
                      <Link href='/account/register'>
                          <button href="#" type="reset" className="w-max p-3 -ml-3">
                              <span className="text-sm tracking-wide text-secondary underline">Create new account</span>
                          </button>
                      </Link>
                      
                  </div>
                  <input hidden type="submit" />
                </form>
              </div>
            </div>
        </div>
      </div>  
    </Layout>
  )
}

export default Login  



export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  
  if (session?.user) {
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