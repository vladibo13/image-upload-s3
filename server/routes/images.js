const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { imageUpload } = require('../utils/imageUpload');
const { imageValidation } = require('../validations/imageValidation');
const { createImage, getAllImages } = require('../utils/queryHelpers');

router.post('/newImage', imageValidation, async (req, res, next) => {
	const { description, base64Image } = req.body;
	if (!description || !base64Image) return res.status(400).json({ msg: 'all fields are mandatory' });
	// console.log('base64Image = ', base64Image);
	try {
		const result = await imageUpload(base64Image, description);
		const { location, key } = result;
		const queryResult = await pool.execute(
			'INSERT INTO `amazon_s3`.`Images` (`image`, `description`) VALUES (?,?)',
			[ location, key ]
		);
		const [ query ] = queryResult;
		res.status(200).json({ msg: `success ${query.affectedRows} inserted`, amzon_s3: { location, key } });
	} catch (ex) {
		res.status(400).json({ msg: 'error ' + ex });
	}
});

router.get('/getImages', async (req, res, next) => {
	try {
		const query = await pool.execute('SELECT * FROM `amazon_s3`.`Images`');
		const [ result ] = query;
		res.status(200).json({ result });
	} catch (ex) {
		res.status(400).json({ msg: 'error ' + ex });
	}
});

module.exports = router;
