import React from 'react';
import { Footer, Header, Background, GlobalStyles } from '../ui';
import styled from 'styled-components';

export default styled(({ children, className }) => (
    <>
        <GlobalStyles />
        <Background className="bg" />
        <div className={className}>
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
