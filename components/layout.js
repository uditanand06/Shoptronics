import Head from 'next/head'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({title, keywords, description, children}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
           </Head>
            <Navbar />
                <div>
                    {children}
                </div>
            <Footer /> 
        </div>
    )
}

export default Layout

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
}