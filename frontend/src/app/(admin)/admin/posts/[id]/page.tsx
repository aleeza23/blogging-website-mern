import PostForm from "@/features/posts/components/PostForm";
import React from "react";

const EditPost = () => {
	return (
		<>
			<h2 className="text-xl font-medium mb-6">Update post</h2>
			<PostForm />
		</>
	);
};

export default EditPost;
