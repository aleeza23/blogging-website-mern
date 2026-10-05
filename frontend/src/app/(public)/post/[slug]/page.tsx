import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import axios from "axios";
import Container from "@/components/layout/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getPost } from "@/features/posts/services/post.services";
import { sanitizeHtml } from "@/lib/html";
import { Post } from "@/features/posts/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CommentForm from "@/features/comments/components/CommentForm";
import CommentCard from "@/features/comments/components/CommentCard";
import { getComments } from "@/features/comments/services/comments.services";
import { Comment } from "@/features/comments/types";
import { formatDate } from "@/lib/date";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

const loadPost = cache(async (slug: string): Promise<Post | null> => {
	try {
		const res = await getPost(slug);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404)
			return null;
		throw error;
	}
});

const loadComments = async (postId: string) => {
	const res = await getComments(postId);
	return res.data;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await loadPost(slug);
	if (!post) return { title: "Post not found" };

	return {
		title: post.title,
		description: post.content,
		openGraph: {
			title: post.title,
			images: post.coverImageUrl?.startsWith("http")
				? [post.coverImageUrl]
				: [],
		},
	};
}

export default async function SingleBlogPage({ params }: Props) {
	const { slug } = await params;
	const post = await loadPost(slug);
	if (!post || !post._id) notFound();

	const { title, content, coverImageUrl, tags, author, createdAt, _id } = post;
	const comments = await loadComments(_id);

	const authorName = `${author?.firstName} ${author?.lastName}`.trim();
	const initials =
		`${author?.firstName?.[0] ?? ""}${author?.lastName?.[0] ?? ""}`.toUpperCase();
	const hasCover = !!coverImageUrl?.startsWith("http");

	return (
		<Container className="pt-32 pb-16 lg:pb-24">
			<article className="mx-auto w-full max-w-2xl pb-4">
				<header className="mb-6 lg:mb-8">
					<address className="mb-6 flex items-center not-italic">
						<Avatar className="mr-4 size-16">
							<AvatarImage
								src={author?.avatarUrl || undefined}
								alt={authorName}
							/>
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-xl font-bold">{authorName}</p>
							{author?.bio && (
								<p className="text-base text-muted-foreground">{author?.bio}</p>
							)}
							<p className="text-base text-muted-foreground">
								<time>{createdAt && formatDate(createdAt)}</time>
							</p>
						</div>
					</address>

					<h1 className="mb-4 text-3xl font-extrabold leading-tight lg:text-4xl">
						{title}
					</h1>

					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Badge
									key={tag}
									variant="default"
									className="bg-primary/10 text-primary"
								>
									{tag}
								</Badge>
							))}
						</div>
					)}
				</header>

				{hasCover && (
					<Image
						src={coverImageUrl!}
						alt={title}
						width={1200}
						height={630}
						priority
						sizes="(min-width: 768px) 672px, 100vw"
						className="mb-8 aspect-video w-full rounded-lg object-cover"
					/>
				)}

				<div
					className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
				/>
			</article>
			<Separator />
			<div className="mt-4 max-w-2xl mx-auto space-y-4">
				<div>
					<h3 className="font-bold mb-4">All comments</h3>
					{comments.map((comment: Comment, index: number) => {
						return (
							<CommentCard
								key={index}
								className="p-3 px-0!"
								comment={comment}
							/>
						);
					})}
				</div>
				<Separator />
				<CommentForm id={_id} />
			</div>
		</Container>
	);
}
