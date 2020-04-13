import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    data: any;
}

const Table: FunctionComponent<Props> = (props: Props) => {
    const { data } = props;
    return (
        <div className={props.className}>
            {Object.entries(data).map(values => (
                <div className="row" key={values[0]}>
                    <div>{values[0]}:</div>
                    <div className={`field--${values[0]}`}>{values[1]}</div>
                </div>
            ))}
        </div>
    );
};

export default styled(Table)`
    font-size: 12px;
    font-weight: 900;

    .row {
        display: flex;
        margin-bottom: 3px;
        div {
            white-space: pre-wrap;
        }
        > div {
            :first-child {
                width: 80px;
                flex-shrink: 0;
            }
            :nth-child(2) {
                width: calc(100% - 80px);
            }
        }
    }
`;
