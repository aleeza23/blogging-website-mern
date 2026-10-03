import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Post } from "../types";
import Link from "next/link";

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

const PostCard = ({
	post,
	isAdmin = false,
}: {
	post: Post;
	isAdmin?: boolean;
}) => {
	const { title, coverImageUrl, author, createdAt, slug } = post;
	console.log(post);

	return (
		<Card className="ring-0 pt-0">
			<div className="group relative w-full h-45 overflow-hidden">
				{coverImageUrl && (
					<Image
						src={coverImageUrl}
						alt={title}
						width={1000}
						height={1000}
						className="h-full w-full object-cover"
					/>
				)}

				{coverImageUrl && isAdmin && (
					<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
						<Button
							type="button"
							size="icon"
							variant="secondary"
							className="size-9"
							render={<Link href={`/admin/posts/edit/${slug}`} />}
						>
							<Pencil className="size-4" />
						</Button>

						<Button
							type="button"
							size="icon"
							variant="destructive"
							className="size-9"
						>
							<Trash2 className="size-4" />
						</Button>
					</div>
				)}
			</div>

			<CardHeader>
				<CardTitle>
					<Link
						className="hover:text-primary transition-colors"
						href={`/post/${post.slug}`}
					>
						{title}
					</Link>
				</CardTitle>
			</CardHeader>

			<CardFooter className="flex items-center gap-3">
				<Avatar className="h-7 w-7">
					<AvatarImage src={author?.avatarUrl} alt={author?.firstName} />
					<AvatarFallback className="text-[10px] font-semibold">
						{author?.firstName?.[0]}
					</AvatarFallback>
				</Avatar>

				<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
					{author?.firstName}
				</span>

				<span className="text-[16px] font-light text-slate-500">/</span>

				{createdAt && (
					<span className="text-[12px] font-semibold uppercase tracking-[0.02em] text-slate-900">
						{formatDate(createdAt)}
					</span>
				)}
			</CardFooter>
		</Card>
	);
};

export default PostCard;
