import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export default styled.div`
    max-width: 1000px;
    margin: 0 auto;
    @media (max-width: ${1000 + 19 * 2}px) {
        padding: 0 19px;
    }
`;
