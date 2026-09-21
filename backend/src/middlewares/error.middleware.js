const errorHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message,
		...(process.env.NODE_ENV != "production" && { stack: err.stack }),
	});
};

module.exports = errorHandler;
