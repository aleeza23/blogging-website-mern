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
import { useState } from "react";
import { PostFormTypes } from "../types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PostForm = () => {
	const [formData, setFormData] = useState<PostFormTypes>({
		title: "",
		content: "",
		coverImage: [],
		tags: [],
		status: "draft",
	});

	return (
		<form>
			<div className="grid md:grid-cols-2 gap-4">
				<div className="grid col-span-2 md:col-span-1 gap-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						type="title"
						placeholder="Enter title..."
						required
					/>
				</div>
				<div className="grid col-span-2 md:col-span-1 gap-2">
					<Label htmlFor="tags">Tags</Label>
					<div className="flex  flex-wrap items-center gap-2 rounded-md border bg-background px-3 py-1">
						<Badge>
							Title
							<Button
								type="button"
								size="icon-xs"
								variant="ghost"
								className="size-4 p-0 hover:text-white hover:bg-transparent"
							>
								<X className="size-3" />
							</Button>
						</Badge>

						<Input
							id="tags"
							type="text"
							placeholder="Enter tags..."
							className="h-7 min-w-20 flex-1 border-0 p-0 shadow-none focus-visible:ring-0"
						/>
					</div>
				</div>

				<div className="col-span-2">
					<FileUpload value={formData.coverImage} maxFiles={1}>
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
						<FileUploadList>
							{formData.coverImage.map((file) => (
								<FileUploadItem key={file.name} value={file}>
									<FileUploadItemPreview />
									<FileUploadItemMetadata />
									<FileUploadItemProgress />
								</FileUploadItem>
							))}
						</FileUploadList>
					</FileUpload>
				</div>

				<div className="grid gap-2 ms-auto col-span-2">
					{/* <Label htmlFor="status">Status</Label> */}
					<Select>
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
