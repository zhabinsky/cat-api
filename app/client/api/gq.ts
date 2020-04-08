import fetch from 'node-fetch';

const isServer = typeof window === 'undefined';
const GQ_ENDPOINT = isServer ? `http://localhost:${8081}/graphql` : '/graphql';

export default async (request: string) => {
	const result = await fetch(GQ_ENDPOINT,{
		method: 'POST',
		body: request,
		headers: {
			"Content-Type": "application/graphql"
		}
	}).then(e => e.json());

	/** Handle errors */
	if(!result || result.errors) {
		console.log('Error while fetching GQ',{ result });
		return {};
	}

	return result.data;
};