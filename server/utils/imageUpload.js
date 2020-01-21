const imageUpload = async (base64, description) => {
	const AWS = require('aws-sdk');
	console.log('base64 = ', base64);

	// Configuration AWS
	const { ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET } = process.env;
	// Configuration AWS to use promise
	AWS.config.setPromisesDependency(require('bluebird'));
	AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY });

	// Create an s3 instance
	const s3 = new AWS.S3();

	// Ensure that  POST have base64 data to your server.
	const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
	console.log('BASE 64 DATA', base64Data);
	// Getting the file type, ie: jpeg, png or gif
	const type = base64.split(';')[0].split('/')[1];
	console.log('TYPE = ', type);

	//params setup to s3.upload
	const params = {
		Bucket: BUCKET,
		Key: `${description}.${type}`,
		Body: base64Data,
		ACL: 'public-read',
		ContentEncoding: 'base64', // required
		ContentType: `image/${type}` // required.
	};

	let location = '';
	let key = '';
	try {
		const { Location, Key } = await s3.upload(params).promise();
		location = Location;
		key = Key;
	} catch (error) {
		console.log(error);
	}

	// Location (url) to your database and Key if needs be.
	console.log(`Location = ${location}, ${key} = key`);

	return location;
};

module.exports = { imageUpload };
