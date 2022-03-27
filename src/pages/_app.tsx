import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />

        <Toaster reverseOrder={false} position="top-right" />
      </Layout>
    </React.Fragment>
  );
};

const EmptyLayout = (props: { children: React.ReactElement }) => {
  return <>{props.children}</>;
};

export default MyApp;
