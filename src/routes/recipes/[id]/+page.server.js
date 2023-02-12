import { error } from '@sveltejs/kit';

import db from '$lib/data/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (!params.id) {
		throw error(404, {
			message: 'Not found'
		});
	}

	let recipe = await getRecipe({ id: params.id });

	if (!recipe) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { recipe };
}

/** @param id string */
async function getRecipe({ id }) {
	return new Promise((resolve, reject) => {
		db.execute('SELECT * FROM recipes WHERE id = ?', [id], (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res[0]);
		});
	});
}
