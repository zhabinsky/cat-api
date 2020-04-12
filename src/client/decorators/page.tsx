import React from 'react';
import styled from 'styled-components';
import { Background, Footer, GlobalStyles, Header } from '../ui';
import { NotificationContainer } from 'react-notifications';

export default styled(({ children, className }) => (
    <>
        <div className={className}>
            <Background className="bg" />
            <Header />
            <main>{children}</main>
            <Footer />
            <NotificationContainer />
        </div>
        <GlobalStyles />
    </>
))`
    position: relative;
    min-height: 100vh;
    main {
        min-height: calc(60vh);
        padding-bottom: 130px;
    }
`;
