import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FaPlayCircle, FaSpinner } from 'react-icons/fa';
import { Button } from '../../ui';
import gq from '../../api/gq';

interface Props {
    className?: string;
    query?: any;
}

const ExecuteQuery: FunctionComponent<Props> = (props: Props) => {
    const { query, ...rest } = props;
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [responseTime, setResponseTime] = React.useState(-1);

    const Icon = isLoading ? FaSpinner : FaPlayCircle;

    return (
        <div {...rest}>
            <Button
                onClick={async () => {
                    if (isLoading) return;
                    setIsLoading(true);

                    const timeStart = Date.now();

                    try {
                        await gq(query).then(setResponse);
                    } catch (err) {
                        setError(err);
                    }

                    setResponseTime(Date.now() - timeStart);
                    setIsLoading(false);
                }}
            >
                Execute query <Icon />
            </Button>
            <div className="response">
                {[['Response', response], ['Error', error]].map(
                    ([title, data]) => {
                        if (typeof data === 'object' && !data) return null;
                        return (
                            <React.Fragment key={title}>
                                <strong>
                                    {title} in {responseTime}ms
                                </strong>
                                <div className={'data data--' + title}>
                                    {JSON.stringify(data, null, 2)}
                                </div>
                            </React.Fragment>
                        );
                    },
                )}
            </div>
        </div>
    );
};

export default styled(ExecuteQuery)`
    button {
        margin-bottom: 10px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        svg {
            margin-left: 10px;
        }
    }

    .response {
        .data {
            &--Error {
                color: red;
            }
            &--Response {
                color: blue;
            }
        }
    }
`;
