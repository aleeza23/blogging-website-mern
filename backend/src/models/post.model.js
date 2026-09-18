const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxLength: 200,
		},
		content: {
			type: String,
			required: [true, "Content is required"],
			trim: true,
		},
		slug: {
			type: String,
			required: [true, "Slug is required"],
			unique: true,
			trim: true,
		},
		coverImageUrl: { type: String, default: "" },
		tags: {
			type: [String],
			index: true,
			set: (tags) => tags.map((tag) => tag.toLowerCase().trim()),
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		status: { type: String, default: "draft", enum: ["draft", "published"] },
	},
	{ timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
