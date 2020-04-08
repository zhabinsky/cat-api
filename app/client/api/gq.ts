import nodeFetch,{ Response,Body } from 'node-fetch';

const isServer = typeof window === 'undefined';
const GQ_ENDPOINT = isServer ? `http://localhost:${8081}/graphql` : '/graphql';

interface GQResponse {
	errors: Array<object> | undefined;
	data: object;
}

export default async <T>(request: string) => {

	const fetcher = (isServer ? nodeFetch : fetch);

	const promise = fetcher(GQ_ENDPOINT,{

		method: 'POST',
		body: request,
		headers: { "Content-Type": "application/graphql" }

	}) as unknown as Promise<Body>;

	const result = await promise.then((e: Body) => {
		return e.json() as Promise<Object>;
	}) as GQResponse;


	if(!result || result.errors) {

		console.log('Error while fetching GQ',{ result });

		return {};
	}

	return result.data;
};