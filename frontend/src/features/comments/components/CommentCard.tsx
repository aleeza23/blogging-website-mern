import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "cn";
import React from "react";
import { Comment } from "../types";

const CommentCard = ({
	className,
	comment,
	isAdmin,
}: {
	className?: string;
	comment: Comment;
	isAdmin?: boolean;
}) => {
	return (
		<Card className={cn(className, "mb-3")}>
			<CardContent>
				{isAdmin && <h2 className="font-bold mt-4">{comment?.post?.title}</h2>}
				<p>{comment?.comment}</p>
			</CardContent>

			<CardFooter className="flex items-center gap-3">
				<Avatar className="h-7 w-7">
					<AvatarImage
						src={comment.author.avatarUrl}
						alt={comment.author.firstName}
					/>
					<AvatarFallback className="text-[10px] font-semibold">
						{comment.author.firstName[0]} {comment.author.lastName[0]}
					</AvatarFallback>
				</Avatar>

				<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
					{comment.author.firstName} {comment.author.lastName}
				</span>
			</CardFooter>
		</Card>
	);
};

export default CommentCard;
