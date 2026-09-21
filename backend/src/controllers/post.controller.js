const Post = require("../models/post.model");
const AppError = require("../utils/error.utils");
const slugify = require("slugify");

const createPostController = async (req, res) => {
	const { title, content, coverImageUrl, tags, author, status } = req.body;

	if (!title || !content) {
		throw new AppError(400, "Title or content is missing");
	}

	const slug = slugify(title);
	const post = await Post.create({
		title,
		slug,
		content,
		coverImageUrl,
		tags,
		author,
		status,
	});

	res.status(201).json({ success: true, data: post });
};

// get single post
const getPostController = async (req, res) => {
	const { slug } = req.params;

	const post = await Post.findOne({ slug }).populate(
		"author",
		"firstName lastName avatarUrl bio",
	);

	if (!post) {
		throw new AppError(404, "Post not found");
	}

	res.status(200).json({ success: true, data: post });
};

// delete post
const deletePostController = async (req, res) => {
	const { id } = req.params;
	// first check the user if same user the one who created the post
	// find post with id get author of that post match it with the user logged in that is in protected middleware

	const post = await Post.findById(id);
	if (post.author.toString() !== req.user.id) {
		throw new AppError(401, "Unauthorized: Cannot delete post");
	}

	await post.deleteOne();

	res.status(200).json({ success: true, message: "Post deleted successfully" });
};

module.exports = {
	createPostController,
	getPostController,
	deletePostController,
};
