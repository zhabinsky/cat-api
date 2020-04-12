import React from 'react';
import styled from 'styled-components';
import { Accordion, Table } from '../../ui';

const domain = process.env.URL;

const instructions = [
    {
        title: 'How to fetch breed via gq?',
        content: {
            endpoint: `${domain}/graphql`,
            method: 'POST',
            headers: 'Content-Type: application/graphql',
            body: `{\n  breedOne (filter: {_id: "XXX"}) {\n    _id\n    name\n    picture\n    votes\n    temperament\n    description\n    origin {\n      name\n    }\n  }\n}`,
        },
    },
    {
        title: 'How to vote via gq?',
        content: {
            endpoint: `${domain}/graphql`,
            method: 'POST',
            headers: 'Content-Type: application/graphql',
            body: `mutation Vote {\n  vote(_id: "XXX") {\n    votes\n  }\n}`,
        },
    },
];

const CatDocs = props => {
    const { className } = props;
    return (
        <div className={className}>
            <h2>Documentation 😸</h2>
            <Accordion>
                {instructions.map(e => ({
                    title: e.title,
                    content: (
                        <pre>
                            <Table data={e.content} />
                        </pre>
                    ),
                }))}
            </Accordion>
        </div>
    );
};

export default styled(CatDocs)`
    max-width: 100%;
    margin-bottom: 20px;
    font-size: 0.875rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;

    h3 {
        color: rgba(0, 0, 0, 0.8);
    }
    > * {
        margin: 16px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.6);
    }

    pre {
        margin-top: 0;
    }

    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    background: white;
    border-radius: 4px;

    .field--endpoint {
        color: #8f8fff;
    }
    .field--body {
        color: green;
    }
`;

export interface CatDocsProps {
    className?: string;
}
