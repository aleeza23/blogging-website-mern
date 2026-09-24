const Joi = require("joi");

const commentSchema = Joi.object({
	comment: Joi.string().trim().required().max(1000).messages({
		"string.max": "comment cannot exceed {#limit} characters",
		"any.required": "Comment is required",
	}),
});

module.exports = commentSchema;
