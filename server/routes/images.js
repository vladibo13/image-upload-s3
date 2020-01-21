const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
const Base64 = require('js-base64').Base64;
const { imageUpload } = require('../utils/imageUpload');

const { ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET } = process.env;

//s3 image profile
const s3 = new aws.S3({
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET_ACCESS_KEY,
	Bucket: BUCKET
});
//single upload
const profileImgUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: BUCKET,
		acl: 'public-read',
		key: function(req, file, cb) {
			cb(
				null,
				path.basename(file.originalname, path.extname(file.originalname)) +
					'-' +
					Date.now() +
					path.extname(file.originalname)
			);
		}
	}),
	limits: { fileSize: 2000000 }, // limit file size = 2 MB
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
}).single('profileImage');
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

router.post('/newImage', async (req, res, next) => {
	const { description, base64Image } = req.body;
	console.log('base64Image = ', base64Image);
	try {
		const result = await imageUpload(base64Image, description);
		res.json({ msg: 'result = ', result });
	} catch (ex) {
		res.json({ msg: 'error from new IMAGE' });
	}
});

router.get('/getImages', (req, res, next) => {
	res.json({ msg: 'get images route' });
});

module.exports = router;
