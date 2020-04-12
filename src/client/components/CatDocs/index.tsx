import React from 'react';
import styled from 'styled-components';
import { Accordion, Table } from '../../ui';
import { FaLink } from 'react-icons/fa';
import ExecuteQuery from './ExecuteQuery';

const domain = process.env.URL;
const prepareQueryDocs = (title, query) => {
    return {
        title,
        content: {
            endpoint: `${domain}/graphql`,
            method: 'POST',
            headers: 'Content-Type: application/graphql',
            body: query,
            execute: <ExecuteQuery query={query} />,
        },
    };
};

const CatDocs = (props) => {
    const { className, catId } = props;

    const instructions = [
        prepareQueryDocs(
            'How to fetch breed via gq?',
            `{\n  breedOne (filter: {_id: "${catId}"}) {\n    _id\n    name\n    picture\n    votes\n    temperament\n    description\n    origin {\n      name\n    }\n  }\n}`,
        ),
        prepareQueryDocs(
            'How to vote via gq?',
            `mutation Vote {\n  vote(_id: "${catId}") {\n    votes\n  }\n}`,
        ),
        prepareQueryDocs('Erroneous query example', `meow {\n  meow\n}`),
    ];

    return (
        <div className={className}>
            <h2>Tiny documentation 😸</h2>
            <Accordion>
                {[
                    ...instructions.map((e) => ({
                        title: e.title,
                        content: (
                            <pre>
                                <Table data={e.content} />
                            </pre>
                        ),
                    })),
                    {
                        title: 'More',
                        content: (
                            <p className="more">
                                More information about supported queries is
                                available at{' '}
                                <a href="/api/graphql">
                                    GQ playground <FaLink />
                                </a>
                            </p>
                        ),
                    },
                ]}
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
        margin: 0;
        padding: 0;
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

    .more {
        p {
            margin: 0;
            padding: 0;
            a {
                padding: 5px 8px;
                background: rgba(0, 0, 255, 0.04);
                border-radius: 2px;
                overflow: hidden;
            }
        }
    }
`;

export interface CatDocsProps {
    className?: string;
    catId?: string;
}
