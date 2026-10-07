import CommentTable from "@/features/comments/components/CommentTable";
import { getAllComments } from "@/features/comments/services/comments.services.server";
import { Comment } from "@/features/comments/types";
import React from "react";

const page = async () => {
	const result = await getAllComments();

	return (
		<div>
			<div className="flex flex-wrap justify-between gap-2.5">
				<h2 className="text-xl font-bold mb-6">Your Comments</h2>
			</div>
			<CommentTable comments={result.data} />
		</div>
	);
};

export default page;
