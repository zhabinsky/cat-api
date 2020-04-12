import React from 'react';
import styled from 'styled-components';

export default styled.div`
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(
        123.5deg,
        rgba(244, 219, 251, 1) 29.3%,
        rgba(255, 214, 214, 1) 67.1%
    );
    color: white;
    content: ' ';
    height: 280px;
    overflow: hidden;
    position: absolute;
    width: 100%;
    z-index: -1;
    ::after {
        background: #f5f5f5;
        content: ' ';
        height: 300px;
        left: 0;
        position: absolute;
        top: 100%;
        transform-origin: top left;
        transform: rotate(-4deg);
        width: 120vw;
    }
`;
