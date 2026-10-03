import PostForm from "@/features/posts/components/PostForm";
import React from "react";

const page = () => {
	return (
		<>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-medium mb-6">Posts</h2>
			</div>

			<PostForm />
		</>
	);
};

export default page;
