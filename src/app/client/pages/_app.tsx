import React from 'react';

/**
 * NextJS continues crashing on step "Automatically optimise static pages"
 * Turning on getInitialProps to App component allows to skip that step.
 */

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

MyApp.getInitialProps = async () => {
    return {};
};

export default MyApp;
