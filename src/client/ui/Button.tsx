import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: any;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<Props> = (props: Props) => {
    const { children, ...rest } = props;
    return <button {...rest}>{children}</button>;
};

export default styled(Button)`
    background-position: center;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 5px 10px;
    display: flex;
    align-items: center;
`;
