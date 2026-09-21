const asyncWrap = (fn) => {
	return (req, res, next) => {
		// express middleware get req, res, next
		fn(req, res, next).catch(next);
	};
};

module.exports = asyncWrap;
