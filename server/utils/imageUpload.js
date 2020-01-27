const imageUpload = async (base, description) => {
	const AWS = require('aws-sdk');
	const { ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET } = process.env;

	// Configuration AWS to use promise
	AWS.config.setPromisesDependency(require('bluebird'));
	AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY });

	const s3 = new AWS.S3();
	// turn into image
	const baseData = new Buffer.from(base.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	//get image type
	const type = base.split(';')[0].split('/')[1];

	//s3 config
	const params = {
		Bucket: BUCKET,
		Key: `${description}.${type}`,
		Body: baseData,
		ACL: 'public-read',
		ContentEncoding: 'base64',
		ContentType: `image/${type}`
	};

	let location = '';
	let key = '';
	try {
		const { Location, Key } = await s3.upload(params).promise();
		location = Location;
		key = Key;
	} catch (ex) {
		return { error: `error ${ex}` };
	}

	return { location, key };
};

module.exports = { imageUpload };
