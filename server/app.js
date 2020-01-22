require('dotenv').config();
const express = require('express');
const app = express();
const imageRoutes = require('./routes/images');
const bodyParser = require('body-parser');

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

//welcome route
app.get('/', async (req, res, next) => {
	res.json({ msg: '/api/newImage to upload and /api/getImages to get all images' });
});

app.use('/api', imageRoutes);
app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}...`);
});
