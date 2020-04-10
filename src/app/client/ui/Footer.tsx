import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ConstrainWidth, AppLogo } from '.';

interface Props {
    className?: string;
}

const Footer: FunctionComponent<Props> = (props: Props) => {
    return (
        <footer className={props.className + ' what'}>
            <ConstrainWidth className="container">
                <AppLogo />
                <div className="credits">
                    By{' '}
                    <a href="https://zhabinsky.com" target="__blank">
                        Vlad Zhabinsky
                    </a>
                </div>
            </ConstrainWidth>
        </footer>
    );
};

export default styled(Footer)`
    position: absolute;
    bottom: 0;
    height: 130px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-image: linear-gradient(
        123.5deg,
        rgba(244, 219, 251, 1) 29.3%,
        rgba(255, 214, 214, 1) 67.1%
    );

    .credits {
        color: black;
        opacity: 0.6;
    }
`;
