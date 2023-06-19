import store from '@/app/redux/story';
import '@/app/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
