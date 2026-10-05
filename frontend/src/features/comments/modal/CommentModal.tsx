import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CommentCard from "../components/CommentCard";

import { Comment } from "../types";

const CommentModal = ({
	open,
	onOpenChange,
	comment,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	comment: Comment | null;
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={"p-0"}>
				{comment && (
					<CommentCard
						className="ring-0 shadow-none"
						comment={comment}
						isAdmin
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CommentModal;
