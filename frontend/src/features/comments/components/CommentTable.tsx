"use client";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import CommentModal from "../modal/CommentModal";
import { Comment } from "../types";
import { formatDate } from "@/lib/date";
import { deleteComment } from "../services/comments.services";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CommentTable = ({ comments }: { comments: Comment[] }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
	const router = useRouter();

	const handleOpenModal = (comment: Comment) => {
		setSelectedComment(comment);
		setOpenModal(true);
	};

	const handleDeleteComment = async (commentId: string) => {
		try {
			await deleteComment(commentId);
			toast.success("Comment deleted successfully");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.request.data.message || "Failed to delete comment");
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<>
			<Table>
				<TableHeader className="bg-muted/50 rounded-2xl">
					<TableRow>
						<TableHead>Comment</TableHead>
						<TableHead>Post Title</TableHead>
						<TableHead>Author</TableHead>
						<TableHead>Date posted</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{comments.map((comment) => (
						<TableRow key={comment?._id}>
							<TableCell className="max-w-20 truncate">
								{comment?.comment}
							</TableCell>

							<TableCell className="max-w-40 truncate">
								{comment?.post?.title}
							</TableCell>

							<TableCell>
								{comment?.author?.firstName} {comment?.author?.lastName}
							</TableCell>

							<TableCell>{formatDate(comment?.createdAt)}</TableCell>

							<TableCell className="flex gap-2">
								<Button
									size="icon-xs"
									variant="outline"
									onClick={() => handleOpenModal(comment)}
								>
									<Eye />
								</Button>

								<Button
									size="icon-xs"
									variant="destructive"
									onClick={() => handleDeleteComment(comment._id)}
								>
									<Trash />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{comments.length === 0 && (
				<p className="mt-12 text-center">No comment found</p>
			)}

			<CommentModal
				open={openModal}
				onOpenChange={setOpenModal}
				comment={selectedComment}
			/>
		</>
	);
};

export default CommentTable;
