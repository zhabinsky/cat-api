import nodeFetch, { Body } from 'node-fetch';

const isServer = typeof window === 'undefined';

const GRAPH_QL_ENPOINT = isServer
    ? `http://localhost:${8032}/api/graphql`
    : '/api/graphql';

const gq = async (request: string) => {
    const fetcher = isServer ? nodeFetch : fetch;

    const promise = (fetcher(GRAPH_QL_ENPOINT, {
        method: 'POST',
        body: request,
        headers: { 'Content-Type': 'application/graphql' },
    }) as unknown) as Promise<Body>;

    const result = (await promise.then((e: Body) => {
        return e.json() as Promise<object>;
    })) as GQResponse;

    if (!result || result.errors) {
        throw result;
    }

    return result;
};

export default gq as GQRequestFunction;

export interface GQResponse {
    errors: object[] | undefined;
    data: object;
}

export interface GQRequestFunction {
    (r: string): Promise<object>;
}
