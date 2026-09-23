const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const AppError = require("../utils/error.utils");

// post comment
const createCommentController = async (req, res) => {
	const { postId } = req.params;

	const post = await Post.findById(postId);
	if (!post) throw new AppError(404, "Post not found");

	// commenter is the current login user -> protected middleware
	const newComment = await Comment.create({
		post: post._id,
		author: req.user._id,
		comment: req.body.comment,
	});

	await newComment.populate("author", "firstName lastName avatarUrl");
	res.status(201).json({ success: true, data: newComment });
};

const deleteComment = async (req, res) => {
	const { commentId } = req.params;

	const comment = await Comment.findById(commentId);
	if (!comment) throw new AppError(404, "Comment not found");

	// check comment author and person who is deleting comment
	if (comment.author.toString() !== req.user._id.toString()) {
		throw new AppError(401, "Unauthorized: Cannot delete comment");
	}

	await comment.deleteOne();

	res
		.status(200)
		.json({ success: true, message: "Comment deleted successfully" });
};

const getComments = async (req, res) => {
	const { postId } = req.params;

	const comments = await Comment.find({ post: postId }).populate(
		"author",
		"firstName lastName avatarUrl",
	);

	res.status(200).json({ success: true, data: comments });
};

module.exports = { createCommentController, deleteComment, getComments };
