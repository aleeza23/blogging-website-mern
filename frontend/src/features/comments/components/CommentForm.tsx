"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { createComment } from "../services/comments.services";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CommentForm = ({ id }: { id?: string }) => {
	const [comment, setComment] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id) return;

		try {
			await createComment(id, comment);
			toast.success("Comment added successfully");
			setComment("");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					error.response?.data.message || " Failed to create comment",
				);
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<form className="w-full space-y-4 flex flex-col" onSubmit={handleSubmit}>
			<h3 className="font-bold">Post comment</h3>
			<div className="space-y-2">
				<Label htmlFor="comment">Comment</Label>
				<Input
					id="comment"
					type="comment"
					placeholder="Enter comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
				/>
			</div>
			<Button type="submit" className={"ms-auto"}>
				Post a comment
			</Button>
		</form>
	);
};

export default CommentForm;
