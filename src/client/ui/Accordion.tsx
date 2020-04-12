import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// Idea: https://codepen.io/abergin/pen/ihlDf

const Accordion: FunctionComponent<Props> = (props: Props) => {
    const { children, ...rest } = props;

    const childrenSorted = [...children];
    childrenSorted.sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div {...rest}>
            <ul>
                {childrenSorted.map(({ title, content }, index) => {
                    return (
                        <li>
                            <input type="checkbox" defaultChecked={index > 0} />
                            <i />
                            <h3>{title}</h3>
                            <div className="accordion-item">{content}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const transition = 'transition: all 0.25s ease-in-out;';
export default styled(Accordion)`
    @media (min-width: 1000px) {
        width: 500px;
    }

    ul {
        position: relative;
        list-style: none;
        perspective: 900;
        padding: 0;
        margin: 0;
    }

    i {
        position: absolute;
        top: 20px;
        right: 15px;
        ${transition}

        &:before,
        &:after {
            content: '';
            position: absolute;
            background-color: red;
            width: 3px;
            height: 9px;
            ${transition}
        }

        &:before {
            transform: translate(-2px, 0) rotate(45deg);
        }

        &:after {
            transform: translate(2px, 0) rotate(-45deg);
        }
    }

    li {
        position: relative;
        padding: 0;
        margin: 0;
        border-top: 1px dotted rgba(0, 0, 0, 0.1);
    }

    h3 {
        font-size: 20px;
        line-height: 34px;
        font-weight: 300;
        display: block;
        margin: 0;
        cursor: pointer;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .accordion-item {
        position: relative;
        overflow: hidden;
        max-height: 800px;
        @extend .transition;
        opacity: 1;
        transform: translate(0, 0);
        margin-top: 14px;
        z-index: 2;
        ${transition}
    }

    input[type='checkbox'] {
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
        background: red;
        &:checked {
            & ~ .accordion-item {
                margin-top: 0;
                max-height: 0;
                opacity: 0;
                transform: translate(0, 50%);
            }

            & ~ i {
                &:before {
                    transform: translate(2px, 0) rotate(45deg);
                }
                &:after {
                    transform: translate(-2px, 0) rotate(-45deg);
                }
            }
        }
    }
`;

export interface AccodionItem {
    title: string;
    content: any;
}

export interface Props {
    className?: string;
    children: Array<AccodionItem>;
}
