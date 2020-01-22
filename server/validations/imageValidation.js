const Joi = require('@hapi/joi');

const imageSchema = Joi.object({
	base64Image: Joi.string().required(),
	description: Joi.string().required()
});

function imageValidation(req, res, next) {
	const { error } = imageSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

module.exports = { imageValidation };
