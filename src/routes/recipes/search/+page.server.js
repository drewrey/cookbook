import { error } from '@sveltejs/kit';

import db from '$lib/data/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	let responseData = [];

	let searched = false;

	if (url.searchParams.has('q')) {
		searched = true;
		responseData = await searchRecipes({ query: url.searchParams.get('q')?.toString() || '' });
	}

	return { results: responseData, searched };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const query = formData.get('q')?.toString() || '';

		const data = await searchRecipes({ query });

		if (!data) {
			throw error(500, {
				message: 'Error searching'
			});
		}

		return { results: data };
	}
};

/**
 * @param {Object} obj
 * @param {string} obj.query
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
