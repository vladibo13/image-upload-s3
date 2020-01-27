require('dotenv').config();
const express = require('express');
const app = express();
const imageRoutes = require('./routes/images');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const { PORT } = process.env;

// parse application
app.use(
	bodyParser.urlencoded({
		limit: '5mb',
		parameterLimit: 100000,
		extended: false
	})
);

app.use('/api/image', imageRoutes);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}...`);
	logger.info(`server is listening to port: ${PORT}`);
});
