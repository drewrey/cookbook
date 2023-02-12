import { error } from '@sveltejs/kit';

import db from '$lib/data/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let recipes = await getRandomRecipes();

	if (!recipes) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { recipes };
}

/** @param id string */
async function getRandomRecipes() {
	return new Promise((resolve, reject) => {
		db.execute('SELECT * FROM recipes order by rand() limit 10', [], (err, res) => {
			if (err) {
				reject(err);
			}
			resolve(res);
		});
	});
}
