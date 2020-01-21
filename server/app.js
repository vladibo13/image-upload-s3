require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db/pool');
const imageRoutes = require('./routes/images');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
// parse application
app.use(
	bodyParser.urlencoded({
		limit: '5mb',
		parameterLimit: 100000,
		extended: false
	})
);
// parse application/json
app.use(
	bodyParser.json({
		limit: '5mb'
	})
);

app.get('/', async (req, res, next) => {
	const result = await pool.execute('select * from northwind.customers');
	const [ first ] = result;
	res.json(first);
});

app.use('/api', imageRoutes);
app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}...`);
});
