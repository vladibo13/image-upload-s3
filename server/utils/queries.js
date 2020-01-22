function addImageS3Query() {
	return 'INSERT INTO `amazon_s3`.`Images` (`image`, `description`) VALUES (?,?)';
}

function getAllImagesQuery() {
	return 'SELECT * FROM `amazon_s3`.`Images`';
}

module.exports = { addImageS3Query, getAllImagesQuery };
