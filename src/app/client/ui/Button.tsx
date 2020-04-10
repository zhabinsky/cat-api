import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<Props> = (props: Props) => {
    const { children, ...rest } = props;
    return (
        <button {...rest}>
            <span>{children}</span>
        </button>
    );
};

export default styled(Button)`
    background-position: center;
    color: white;
    border: none;
    font-size: 16px;
    text-transform: uppercase;
    padding: 5px 10px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
`;
