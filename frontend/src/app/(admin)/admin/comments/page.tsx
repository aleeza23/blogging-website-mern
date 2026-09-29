import CommentTable from "@/features/comments/components/CommentTable";
import React from "react";

const page = () => {
	return (
		<div>
			<h2 className="text-xl font-medium mb-6">Manage Comments</h2>
            <CommentTable />
		</div>
	);
};

export default page;
