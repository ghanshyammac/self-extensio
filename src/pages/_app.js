/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import CssBaseline from '@material-ui/core/CssBaseline';
import initStore from '../store';
import Layout from '../components/Layout';

export default withRedux(initStore)(
  class MyApp extends App {
    render() {
      const {
        Component, pageProps, store,
      } = this.props;

      return (
        <Provider store={store}>
          <Head>
            <title>ECommerce</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <script src="https://unpkg.com/@contentstack/ui-extensions-sdk@2.1.2/dist/ui-extension-sdk.js" />
            <link href="https://unpkg.com/@contentstack/ui-extensions-sdk@2.1.2/dist/ui-extension-sdk.css" rel="stylesheet" />
          </Head>
          <CssBaseline />
          <Layout>
            {/* <h1>Welcome to extension plugins</h1> */}
            <Component {...pageProps} />
          </Layout>
        </Provider>
      );
    }
  },
);
