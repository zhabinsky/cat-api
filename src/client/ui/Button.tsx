import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    children?: any;
    'aria-label'?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<Props> = (props: Props) => {
    const { children, ...rest } = props;
    return (
        <button {...rest}>
            <i />
            {children}
        </button>
    );
};

export default styled(Button)`
    background: white;
    background-position: center;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 5px 10px;

    i {
        content: '';
        background: pink;
        display: block;
        position: absolute;
        padding-top: 200%;
        padding-left: 200%;
        opacity: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.8s;
        z-index: 0;
        border-radius: 50%;
        transition: all 1s;
    }

    :active i {
        transition: all 0s;
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s;
    }
`;
