"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	type FileUploadProps,
	FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { PostFormTypes } from "../types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { createPost, getPost, updatePost } from "../services/post.services";
import { json } from "node:stream/consumers";
import { toast } from "sonner";
import axios from "axios";
import { uploadImage } from "@/services/upload.services";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/shared/Loader";

type Props = {
	mode?: "create" | "edit";
	slug?: string;
};
const PostForm = ({ mode, slug }: Props) => {
	const [formData, setFormData] = useState<PostFormTypes>({
		title: "",
		content: "",
		coverImageUrl: [],
		tags: "",
		status: "draft",
	});
	const [tags, setTags] = useState<string[]>([]);
	const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(mode === "edit");
	const router = useRouter();

	useEffect(() => {
		if (mode !== "edit" || !slug) return;

		const fetchPost = async () => {
			try {
				const result = await getPost(slug || "");
				const data = result.data;
				console.log(data, 'post data');
				
				setFormData({
					title: data.title,
					content: data.content,
					coverImageUrl: [],
					tags: "",
					status: data.status,
				});
				setTags(data.tags || []);
				setExistingImageUrl(data.coverImageUrl || null);
				console.log(data, "data");
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast.error(error?.response?.data?.message || "Something went wrong");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [mode, slug]);

	// console.log(existingImageUrl, "params");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			let coverImageUrl = existingImageUrl ?? "";
			if (formData.coverImageUrl[0]) {
				const result = await uploadImage(formData.coverImageUrl[0]);
				coverImageUrl = result.data.imageUrl;
			}

			const payload = {
				title: formData.title,
				content: formData.content,
				tags: tags,
				status: formData.status,
				coverImageUrl,
			};

			if (mode === "edit") {
				await updatePost(slug || "", payload);
				toast.success("Post updated successfully");
			} else {
				await createPost(payload);
				toast.success("Post created successfully");
			}

			router.push("/admin/posts");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data?.message || "Something went wrong");
			}
		}
	};

	if (loading)
		return (
			<div className="flex justify-center items-center h-full">
				<Loader />
			</div>
		);
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid md:grid-cols-2 gap-4">
				<div className="grid col-span-2 md:col-span-1 gap-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						type="title"
						placeholder="Enter title..."
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="grid col-span-2 md:col-span-1 gap-2">
					<Label htmlFor="tags">Tags</Label>
					<div className="flex  flex-wrap items-center gap-2 rounded-md border bg-background px-3 py-1">
						{tags.map((t) => {
							return (
								<Badge key={t}>
									{t}
									<Button
										type="button"
										size="icon-xs"
										variant="ghost"
										className="size-4 p-0 hover:text-white hover:bg-transparent"
									>
										<X className="size-3" />
									</Button>
								</Badge>
							);
						})}
						<Input
							id="tags"
							type="text"
							placeholder="Enter tags..."
							value={formData.tags}
							onChange={handleChange}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.code === "Space") {
									setTags([...tags, formData.tags]);
									setFormData((prev) => ({ ...prev, tags: "" }));
								}
							}}
							className="h-7 min-w-20 flex-1 border-0 p-0 shadow-none focus-visible:ring-0"
						/>
					</div>
				</div>

				<div className="col-span-2">
					<FileUpload
						value={formData.coverImageUrl}
						maxFiles={1}
						onValueChange={(file) => {
							setFormData((prev) => ({ ...prev, coverImageUrl: file }));
							setExistingImageUrl(null);
						}}
					>
						<FileUploadDropzone>
							<div className="flex flex-col items-center gap-1 text-center">
								<div className="flex items-center justify-center rounded-full border p-2.5">
									<Upload className="size-6 text-muted-foreground" />
								</div>
								<p className="text-sm font-medium">Drag & drop files here</p>
								<p className="text-xs text-muted-foreground">
									Or click to browse (max 1 file)
								</p>
							</div>

							<FileUploadTrigger
								render={
									<Button size="sm" className="mt-2 w-fit">
										Browse files
									</Button>
								}
							/>
						</FileUploadDropzone>
						{existingImageUrl && (
							<div className="relative flex items-center gap-2.5 rounded-md border p-3">
								<div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50">
									<Image
										src={existingImageUrl}
										alt="Current cover"
										width={40}
										height={40}
										className="size-full object-cover"
									/>
								</div>
								<div className="flex min-w-0 flex-1 flex-col">
									<span className="truncate text-sm font-medium">
										Current cover image
									</span>
									<span className="text-xs text-muted-foreground">
										Upload a new one to replace it
									</span>
								</div>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => setExistingImageUrl(null)}
								>
									<X className="size-4" />
								</Button>
							</div>
						)}
						<FileUploadList>
							{formData.coverImageUrl.map((file, index) => (
								<FileUploadItem key={index} value={file}>
									<FileUploadItemPreview />
									<FileUploadItemMetadata>
										<span className="truncate text-sm font-medium">
											{file.name}
										</span>
										<span className="text-xs text-muted-foreground">
											{Math.round(file.size / 1024)} KB
										</span>
									</FileUploadItemMetadata>
									{/* <FileUploadItemProgress /> */}
								</FileUploadItem>
							))}
						</FileUploadList>
					</FileUpload>
				</div>

				<div className="w-full col-span-2">
					<Label htmlFor="content">Post Content</Label>

					<SimpleEditor
						initialContent={formData.content}
						onChange={(html) => {
							setFormData((prev) => ({ ...prev, content: html }));
						}}
					/>
				</div>

				<div className="grid gap-2 ms-auto col-span-2 mt-5.5">
					{/* <Label htmlFor="status">Status</Label> */}
					<Select
						id="status"
						value={formData.status}
						onValueChange={(value) => {
							if (!value) return;

							setFormData((prev) => {
								return {
									...prev,
									status: value,
								};
							});
						}}
					>
						<SelectTrigger id="status" className={"w-52"}>
							<SelectValue placeholder="Select status..." />
						</SelectTrigger>

						<SelectContent side="bottom" align="start" sideOffset={4}>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="published">Published</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Button type="submit">Save post</Button>
		</form>
	);
};

export default PostForm;
