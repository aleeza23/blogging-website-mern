const AppError = require("../utils/error.utils");

const validateRequest = (schema, property = "body") => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req[property], {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			throw new AppError(400, error.details.map((d) => d.message).join(", "));
		}

		req[property] = value;

		next();
	};
};

module.exports = validateRequest;
