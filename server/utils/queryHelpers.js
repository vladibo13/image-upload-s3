const pool = require('../db/pool');
const { addImageS3Query, getAllImagesQuery } = require('./queries');

async function createImage(location, description) {
	const query = addImageS3Query();
	const payload = [ location, description ];
	const queryInsertion = await pool.execute(query, payload);
	const [ queryResult ] = queryInsertion;
	return queryResult;
}

async function getAllImages() {
	const query = getAllImagesQuery();
	const queryGet = await pool.execute(query);
	const [ queryResult ] = queryGet;
	return queryResult;
}

module.exports = { createImage, getAllImages };
