import React from 'react';
import styled from 'styled-components';
import { Background, Footer, GlobalStyles, Header } from '../ui';

export default styled(({ children, className }) => (
    <>
        <GlobalStyles />
        <div className={className}>
            <Background className="bg" />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    </>
))`
    position: relative;
    min-height: 100vh;
    main {
        min-height: calc(60vh);
        padding-bottom: 130px;
    }
`;
