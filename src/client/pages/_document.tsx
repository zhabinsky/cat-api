import { AppPropsType, AppType } from 'next/dist/next-server/lib/utils';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { DefaultSeo } from 'next-seo';

interface DocumentProps {
    styleTags: Array<Element>;
}

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();

        const page = renderPage((App: AppType) => {
            return (props: AppPropsType) => {
                return sheet.collectStyles(<App {...props} />);
            };
        });

        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        const props = (this.props as unknown) as DocumentProps;

        return (
            <html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,500&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    {props.styleTags}
                </Head>
                <body>
                    <DefaultSeo
                        title="Cat API"
                        openGraph={{
                            type: 'website',
                            locale: 'en',
                            site_name: 'CAT API',
                            images: [{ url: '/oops/png' }],
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
