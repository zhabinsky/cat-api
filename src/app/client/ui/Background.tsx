import React from 'react';
import styled from 'styled-components';

export default styled.div`
    position: absolute;
    width: 100%;
    height: 280px;
    overflow: hidden;
    color: white;
    background-image: linear-gradient(
        123.5deg,
        rgba(244, 219, 251, 1) 29.3%,
        rgba(255, 214, 214, 1) 67.1%
    );
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    content: ' ';
    z-index: -1;

    ::after {
        position: absolute;
        left: 0;
        top: 100%;
        width: 120vw;
        transform-origin: top left;
        height: 300px;
        transform: rotate(-4deg);
        background: #f5f5f5;
        content: ' ';
    }
`;
