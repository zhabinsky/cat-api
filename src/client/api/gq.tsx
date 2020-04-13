import nodeFetch, { Body } from 'node-fetch';
import { NotificationManager } from 'react-notifications';

const isServer = typeof window === 'undefined';

const GRAPH_QL_ENPOINT = isServer
    ? `http://localhost:${8032}/api/graphql`
    : '/api/graphql';

const gq = async (query: string) => {
    const fetcher = isServer ? nodeFetch : fetch;

    const promise = (fetcher(GRAPH_QL_ENPOINT, {
        method: 'POST',
        body: query,
        headers: { 'Content-Type': 'application/graphql' },
    }) as unknown) as Promise<Body>;

    const result = (await promise.then((e: Body) => {
        return e.json() as Promise<object>;
    })) as GQResponse;

    if (!result) {
        throw result;
    }

    if (result.errors) {
        if (!isServer) {
            result.errors.forEach(({ message }) =>
                NotificationManager.error(
                    <div>
                        {message}
                        <pre>{query}</pre>
                    </div>,
                    'Oops..',
                ),
            );
        }

        throw result;
    }

    return result;
};

export default gq as GQRequestFunction;

export interface GQResponse {
    errors: GQError[];
    data: object;
}

export interface GQRequestFunction {
    (r: string): Promise<object>;
}

export interface GQError {
    message: string;
}
