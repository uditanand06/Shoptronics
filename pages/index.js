import Creator from "../components/creator/creator";
import Hero from "../components/hero/hero";
import Layout from "../components/layout";
import NewsLetter from "../components/newsletter/newsletter";
import TopCollectibles from "../components/topCollectibles/topCollectibles";
import { API_URL } from "../config";



export default function Home({products}) {

  return (
    <Layout title="home">
      <Hero />
      <NewsLetter />
      <Creator />
      <TopCollectibles products={products} />
    </Layout>
    
  )
}


export async function getServerSideProps(){
  const res=await fetch(`${API_URL}/product`);
  const products = await res.json()
  return{
      props:{
          products:products
      }
  }
}