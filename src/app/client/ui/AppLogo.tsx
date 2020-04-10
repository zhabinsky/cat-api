import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
    className?: string;
}

const AppLogo: FunctionComponent<Props> = (props) => (
    <Link href="/">
        <a>
            <div {...props}>
                <span>cat</span>
                <span>api</span>
            </div>
        </a>
    </Link>
);

export default styled(AppLogo)`
    display: flex;
    align-items: center;
    user-select: none;

    span:first-child {
        font-size: 32px;
        font-weight: 900;
    }
    span:last-child {
        font-size: 18px;
        font-weight: 400;

        border: 1px solid black;
        padding: 2px 5px;
        margin-left: 9px;
    }
`;
