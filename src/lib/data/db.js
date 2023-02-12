import * as dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

if (!process.env.DATABASE_URL) {
	console.error('No DATABASE_URL environment variable set');
	process.exit(1);
}

// maybe this should be using a pool?
const db = mysql.createConnection(process.env.DATABASE_URL);

export default db;
