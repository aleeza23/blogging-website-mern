"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CalendarDays, ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Post } from "../types";
import Link from "next/link";
import { deletePost } from "../services/post.services";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/date";

const MAX_TAGS = 3;

const PostCard = ({
	post,
	isAdmin = false,
}: {
	post: Post;
	isAdmin?: boolean;
}) => {
	const { title, coverImageUrl, author, createdAt, slug, tags = [] } = post;
	const router = useRouter();

	const visibleTags = tags.slice(0, MAX_TAGS);
	const extraTags = tags.length - visibleTags.length;
	const authorName = author?.firstName ?? "Unknown";

	const handleDeletePost = async (slug: string) => {
		if (!window.confirm("Delete this post? This can't be undone.")) return;

		try {
			await deletePost(slug);
			toast.success("Post deleted successfully");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || "Failed to delete post");
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	return (
		<Card className="group relative gap-0 overflow-hidden rounded-2xl border-0 ring-0 bg-card pt-0 shadow-sm  transition-all! duration-300 hover:-translate-y-1 hover:shadow-xl ">
			<div className="relative aspect-video w-full overflow-hidden">
				{coverImageUrl ? (
					<Image
						src={coverImageUrl}
						alt={title}
						width={1000}
						height={625}
						className="h-full w-full object-cover transition-transform! duration-700 ease-out will-change-transform group-hover:scale-110"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
						<ImageIcon className="size-10" />
					</div>
				)}

				{isAdmin && (
					<div className="absolute right-3 top-3 z-10 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
						<Button
							type="button"
							size="icon"
							variant="secondary"
							className="size-8 rounded-full shadow-md"
							aria-label={`Edit ${title}`}
							render={<Link href={`/user/posts/edit/${slug}`} />}
						>
							<Pencil className="size-3.5" />
						</Button>

						<Button
							type="button"
							size="icon"
							variant="destructive"
							className="size-8 rounded-full shadow-md"
							aria-label={`Delete ${title}`}
							onClick={() => {
								if (slug) handleDeletePost(slug);
							}}
						>
							<Trash2 className="size-3.5" />
						</Button>
					</div>
				)}
			</div>

			{/* Body */}
			<CardContent className="flex flex-1 flex-col gap-3 px-5 pb-4 pt-5">
				{visibleTags.length > 0 && (
					<ul className="flex flex-wrap gap-1.5" aria-label="Tags">
						{visibleTags.map((tag) => (
							<li
								key={tag}
								className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
							>
								{tag}
							</li>
						))}
						{extraTags > 0 && (
							<li className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
								+{extraTags}
							</li>
						)}
					</ul>
				)}

				<h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
					{isAdmin ? (
						<span>{title}</span>
					) : (
						<Link
							href={`/post/${slug}`}
							className="transition-colors group-hover:text-primary after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
						>
							{title}
						</Link>
					)}
				</h3>
			</CardContent>

			{/* Footer */}
			<CardFooter className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 px-5 py-4">
				<div className="flex min-w-0 items-center gap-2.5">
					<Avatar className="size-8 ring-2 ring-background">
						<AvatarImage src={author?.avatarUrl} alt={authorName} />
						<AvatarFallback className="text-xs font-semibold">
							{authorName[0]}
						</AvatarFallback>
					</Avatar>
					<span className="truncate text-sm font-medium text-foreground">
						{authorName}
					</span>
				</div>

				{createdAt && (
					<time className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
						<CalendarDays className="size-3.5" />
						{formatDate(createdAt)}
					</time>
				)}
			</CardFooter>
		</Card>
	);
};

export default PostCard;
