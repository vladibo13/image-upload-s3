const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { imageValidation } = require('../validations/imageValidation');

router.post('/', imageValidation, imageController.addImage);
router.get('/', imageController.getImages);

module.exports = router;
