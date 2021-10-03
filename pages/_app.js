import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return <>
      <Head>
        <title>Eth-KickStarter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
}

export default MyApp
