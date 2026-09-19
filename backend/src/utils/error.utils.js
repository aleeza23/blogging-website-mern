class AppError extends Error {
	constructor(statusCode, message) {
		supper(message);
		this.statusCode = statusCode;
	}
}

module.exports = AppError;
