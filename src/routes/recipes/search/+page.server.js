import { error } from '@sveltejs/kit';

import db from '$lib/data/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	let responseData = [];

	if (url.searchParams.has('q')) {
		responseData = await searchRecipes({ query: url.searchParams.get('q') });
	}

	return { results: responseData };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = await searchRecipes({ query: formData.get('q') });

		if (!data) {
			throw error(500, {
				message: 'Error searching'
			});
		}

		return { results: data };
	}
};

/**
 * @param {*} param0
 */
async function searchRecipes({ query }) {
	return new Promise((resolve, reject) => {
		// TODO: add pagination
		db.execute(
			"SELECT * FROM recipes WHERE title LIKE concat('%', ?, '%') limit 10",
			[query],
			(err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			}
		);
	});
}
