// import db from './db';
import fs from 'fs';
import csvParser from 'csv-parser';

import db from './db.js';

let counter = 0;

// let data = [];

fs.createReadStream('./src/lib/data/full_dataset.csv', { encoding: 'utf8' })
	.pipe(csvParser({ separator: ',' }))
	.on('data', (chunk) => {
		// if (counter > 2) process.exit(0);
		// data.push(chunk);
		// console.log('hello', counter);
		// console.log('length', data.length);
		// console.log('chunk', chunk);
		db.execute(
			'INSERT INTO recipes (id, title, ingredients, directions, link, source, ner) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				chunk.id,
				chunk.title,
				chunk.ingredients,
				chunk.directions,
				chunk.link,
				chunk.source,
				chunk.NER
			],
			(err, res) => {
				if (err) {
					console.log('chunk ', chunk);
					console.log('err', err);
				}
				if (res) {
					counter++;
					if (counter % 1000 === 0) {
						console.log('counter', counter);
					}
				}
			}
		);
	})
	.on('error', (err) => {
		console.log(err);
	});
