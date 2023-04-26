import store from '@/app/redux/story';
import '@/app/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

export function reportWebVitals(metric: any) {
    console.log(metric);
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
        <Head>
            <title>ResooTime</title>
        </Head>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
        </>

    );
}
