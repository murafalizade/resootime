import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#fffff" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/images/favicon.ico" />
                {/* <link rel="apple-touch-icon" href="/logo.png" /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
