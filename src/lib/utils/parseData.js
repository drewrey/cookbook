/**
 * @param {string} data
 *
 *
 */
export function parseStringifiedArray(data) {
	return data
		.split('"')
		.slice(1, -1)
		.filter((x) => x !== ', ');
}
