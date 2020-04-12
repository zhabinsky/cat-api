import { AppPropsType, AppType } from 'next/dist/next-server/lib/utils';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

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
                    {props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
