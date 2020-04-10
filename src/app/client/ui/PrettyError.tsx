import React, { FunctionComponent, ReactElement } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classnames from 'classnames';

interface Props {
    className?: string;
    children: any;
}

const PrettyError: FunctionComponent<Props> = (props) => (
    <div {...props}>
        <img src="/oops.png" alt="Error message illustration" />
        <div className="message">{props.children}</div>
    </div>
);

export default styled(PrettyError)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
        width: 95px;
        height: 95px;
    }

    .message {
        color: black;
        opacity: 0.6;

        margin-left: 20px;
        font-size: 15px;
        @media (min-width: 768px) {
            font-size: 18px;
        }
    }
`;
