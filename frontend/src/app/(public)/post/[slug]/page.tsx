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

export const revalidate = 60; 

type Props = { params: Promise<{ slug: string }> };

const loadPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const res = await getPost(slug);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.content,
    openGraph: {
      title: post.title,
      images: post.coverImageUrl?.startsWith("http") ? [post.coverImageUrl] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { title, content, coverImageUrl, tags, author, createdAt } = post;
  const authorName = `${author?.firstName} ${author?.lastName}`.trim();
  const initials = `${author?.firstName?.[0] ?? ""}${author?.lastName?.[0] ?? ""}`.toUpperCase();
  const hasCover = !!coverImageUrl?.startsWith("http");

  return (
    <Container className="pt-32 pb-16 lg:pb-24">
      <article className="mx-auto w-full max-w-2xl">
        <header className="mb-6 lg:mb-8">
          <address className="mb-6 flex items-center not-italic">
            <Avatar className="mr-4 size-16">
              <AvatarImage src={author?.avatarUrl || undefined} alt={authorName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-bold">{authorName}</p>
              {author?.bio && (
                <p className="text-base text-muted-foreground">{author?.bio}</p>
              )}
              <p className="text-base text-muted-foreground">
                <time dateTime={createdAt}>{formatDate(createdAt)}</time>
              </p>
            </div>
          </address>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:text-4xl">
            {title}
          </h1>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
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
    </Container>
  );
}