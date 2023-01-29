import 'bootstrap/dist/css/bootstrap.css';

import '@/styles/globals.css'
import Nav from '../components/Navbar/Nav'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Nav></Nav>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </>

  )
}
