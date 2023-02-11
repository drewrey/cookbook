import { error } from '@sveltejs/kit';

// import { TYPESENSE_API_HOST, TYPESENSE_API_KEY } from '$env/static/private';

import data from '$lib/data/search_banana_pudding.json';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	console.log('event', event);
	// console.log('URL', event.request.url.searchParams);
	// console.log('BANANA', $page.url.searchParams);

	let responseData;

	if (!event.request.url.search) {
		responseData = { results: [] };
	} else {
		responseData = data;
		// responseData = await search({ query: event.request.url.search.toString() });
	}

	if (!responseData) {
		throw error(500, {
			message: 'Error searching'
		});
	}

	console.log(data);

	return { data: responseData };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		console.log('event', event);

		// const data = await search({ query: event.request.url.search.toString() });

		if (!data) {
			throw error(500, {
				message: 'Error searching'
			});
		}

		return { data };
	}
};

/**
 * @typedef {{
 *      query: string
 * }} SearchParam
 */

/**
 *
 * @param params {SearchParam}
 */
// async function search({ query }) {
// 	await fetch(
// 		`https://${TYPESENSE_API_HOST}/multi_search?x-typesense-api-key=${TYPESENSE_API_KEY}`,

// 		{
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				searches: [
// 					{
// 						query_by: 'title',
// 						sort_by: '',
// 						highlight_full_fields: 'title',
// 						collection: 'r',
// 						q: `${query}`,
// 						facet_by: 'ingredient_names',
// 						filter_by: '',
// 						max_facet_values: 100,
// 						page: 1,
// 						per_page: 15
// 					}
// 				]
// 			})
// 		}
// 	).then((r) => r.json());
// }
