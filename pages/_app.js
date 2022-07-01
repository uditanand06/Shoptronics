import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AuthContextProvider } from '../context/AuthContext'
import Router, { useRouter } from 'next/router'
import LoadingPage from '../components/loading'
import { useEffect, useState } from 'react'
import { StoreProvider } from '../context/StoreContext'



function MyApp({  Component,  pageProps: { session, ...pageProps },}) {
  
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
      const handleStart = () => { setPageLoading(true); };
      const handleComplete = () => { setPageLoading(false); };
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
    }, [router]);

  
  
  return (
      <AuthContextProvider>
        <StoreProvider>
          <SessionProvider session={session}>
            {
              pageLoading ?
              <LoadingPage /> :
              <Component {...pageProps} />
            }  
          </SessionProvider>
        </StoreProvider>
      </AuthContextProvider>
  )
}

export default MyApp
