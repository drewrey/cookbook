import { error } from '@sveltejs/kit';

// TODO: fetch this data more properly!
import data from '$lib/data/search_banana_pudding.json';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let recipe = data.results[0].hits.find((hit) => hit.document.id === params.id);

	if (!recipe) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { recipe };
}
