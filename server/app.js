require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db/pool');

app.get('/', async (req, res, next) => {
	const result = await pool.execute('select * from northwind.customers');
	const [ first ] = result;
	res.json(first);
});
app.listen(6000, () => {
	console.log(`server running on port ${6000}...`);
});
