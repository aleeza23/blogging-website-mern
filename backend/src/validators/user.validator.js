const Joi = require("joi");

const registerSchema = Joi.object({
	firstName: Joi.string().required().min(2).max(30).messages({
		"string.min": "First name must be at least {#limit} characters long",
		"string.max": "First name cannot exceed {#limit} characters",
		"any.required": "First name is required",
	}),

	lastName: Joi.string().required().min(2).max(30).messages({
		"string.min": "Last name must be at least {#limit} characters long",
		"string.max": "Last name cannot exceed {#limit} characters",
		"any.required": "Last name is required",
	}),

	email: Joi.string().required().trim().email().messages({
		"string.email": "Please provide a valid email address",
		"any.required": "Email is required",
	}),

	password: Joi.string().required().min(8).messages({
		"string.min": "Password must be at least {#limit} characters long",
		"any.required": "Password is required",
	}),

	bio: Joi.string().optional().trim().max(500).messages({
		"string.max": "Bio cannot exceed {#limit} characters",
	}),

	avatarUrl: Joi.string().optional(),
});

const loginSchema = Joi.object({
	email: Joi.string().required().trim().email().messages({
		"string.email": "Please provide a valid email address",
		"any.required": "Email is required",
	}),

	password: Joi.string().required().messages({
		"any.required": "Password is required",
	}),
});

