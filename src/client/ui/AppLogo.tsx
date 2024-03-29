import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Link } from '../ui';

interface Props {
    className?: string;
}

const AppLogo: FunctionComponent<Props> = props => (
    <Link href="/">
        <h1 {...props}>
            <span>cat</span>
            <span>api</span>
        </h1>
    </Link>
);

export default styled(AppLogo)`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;

    span:first-child {
        font-size: 32px;
        font-weight: 900;
    }
    span:last-child {
        border: 1px solid black;
        font-size: 18px;
        font-weight: 400;
        margin-left: 9px;
        padding: 2px 5px;
    }
    user-select: none;
`;
