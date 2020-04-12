import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
    data: any;
}

const Table: FunctionComponent<Props> = (props: Props) => {
    const { data } = props;

    return (
        <table className={props.className}>
            <tbody>
                {Object.entries(data).map((values) => (
                    <tr key={values[0]}>
                        <td>{values[0]}:</td>
                        <td className={`field--${values[0]}`}>{values[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default styled(Table)`
    &, td {
        font-size: 12px;
    }
    td:first-child {
        font-weight: 900;
    }
    td {
        padding: 0 5px 5px 0;
        vertical-align: top;
    }
`;
