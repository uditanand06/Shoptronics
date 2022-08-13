import React from 'react'
import Layout from "../../components/layout"
import Image from "next/image";
import RegisterSide from "../../components/registerSide";
import { getSession } from 'next-auth/react';


const Register = () => {
  return (
    <Layout title="signup">
      
      <div className="h-screen flex justify-center items-center ">
        <div className="absolute top-0 left-0 w-full h-full -z-10 ">
          <Image src='/wallpaper2.jpg' layout="fill" objectFit="cover" alt="" />
        </div>
        <div className="mt-[100px] mb-[20px] md:m-auto flex md:w-3/4 md:h-3/4 p-4 glass_effect">
            <div className="w-full hidden md:flex  bg-[#B253F7] rounded-xl p-2">
              <Image src='/signup.svg' height={600} width={500} alt="" />
            </div>
            <div className="w-full">
              <RegisterSide />
            </div>
        </div>
      </div>  
    </Layout>
  )
}

export default Register

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session?.user ) {
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

