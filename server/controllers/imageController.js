const logger = require('../utils/logger');
const { imageUpload } = require('../utils/imageUpload');
const { createImage, getAllImages } = require('../utils/queryHelpers');

const addImage = async (req, res, next) => {
	try {
		const result = await imageUpload(base64Image, description);
		const { location, key, error } = result;
		if (error) throw error;
		const query = await createImage(location, key);
		res.status(200).json({ msg: `success ${query.affectedRows} inserted`, amazonResult: { location, key } });
	} catch (ex) {
		logger.error('error ' + ex);
		res.status(400).json({ msg: 'something went wrong ' });
	}
};

const getImages = async (req, res, next) => {
	try {
		const query = await getAllImages();
		res.status(200).json({ images: query });
	} catch (ex) {
		logger.error('error ' + ex);
		res.status(400).json({ msg: 'something went wrong ' });
	}
};

module.exports = {
	addImage,
	getImages
};
