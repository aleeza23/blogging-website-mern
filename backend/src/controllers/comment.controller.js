const Comment = require("../models/comment.model");
const AppError = require("../utils/error.utils");

// post comment
const createCommentController = async (req, res) => {
	const { comment, post, author } = req.body;

	if (!author || !comment) {
		throw new AppError(400, "Author or comment is missing");
	}

	const newComment = await Comment.create({ comment, post, author });

	res.status(201).json({ success: true, data: newComment });
};

module.exports = { createCommentController };
