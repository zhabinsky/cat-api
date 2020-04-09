import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

interface Props {
    className?: string;
    children?: any;
    ripple?: boolean;
    square?: boolean;
    backgroundColor?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<Props> = (props: Props) => {
    const {
        className,
        children,
        onClick,
        ripple = true,
        square = false,
    } = props;
    return (
        <button
            className={classnames(className, { ripple, square })}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    );
};

const select = key => p => p[key];
export default styled(Button)`
    background: red;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    background-color: ${select('backgroundColor')};
    outline: none;
    border: none;

    &.ripple {
        background-position: center;
        transition: background 1.2s;
    }
    &.ripple:hover {
        background: ${select('backgroundColor')}
            radial-gradient(
                circle,
                transparent 3%,
                ${select('backgroundColor')} 1%
            )
            center/15000%;
    }
    &.ripple:active {
        background-color: rgba(0, 0, 0, 0.1);
        background-size: 100%;
        transition: background 0s;
    }
    &.square span {
        width: 20px;
        height: 20px;
    }
    &.square {
        width: 35px;
        height: 35px;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    &:not(.square) {
        padding: 5px 10px;
        border-radius: 4px;
    }
`;
