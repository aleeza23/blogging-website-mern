const Joi = require("joi");

const postSchema = Joi.object({
	title: Joi.string().trim().max(200).required().messages({
		"string.max": "Title cannot exceed {#limit} characters",
		"any.required": "Title is required",
	}),
	content: Joi.string().trim().max(500).required().messages({
		"string.max": "Content cannot exceed {#limit} characters",
		"any.required": "Content is required",
	}),
	coverImageUrl: Joi.string().optional().default(""),
	tags: Joi.array().items(Joi.string().trim()).optional().default([]),
	status: Joi.string().valid("draft", "published").optional().default("draft"),

});

module.exports = postSchema;