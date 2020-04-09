import nodeFetch, { Response, Body } from 'node-fetch';

const isServer = typeof window === 'undefined';

const GRAPH_QL_ENPOINT = isServer
    ? `http://localhost:${8081}/graphql`
    : '/graphql';

interface GQResponse {
    errors: object[] | undefined;
    data: object;
}

export default async (request: string) => {
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
        console.log('Error while fetching GQ', { result });

        throw Error('result.errors' + result.errors);
    }

    return result.data;
};
