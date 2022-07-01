import Creator from "../components/creator/creator";
import Hero from "../components/hero/hero";
import Layout from "../components/layout";
import NewsLetter from "../components/newsletter/newsletter";
import TopCollectibles from "../components/topCollectibles/topCollectibles";



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
  const res=await fetch('http://localhost:3000/api/product');
  const products = await res.json()
  return{
      props:{
          products:products
      }
  }
}