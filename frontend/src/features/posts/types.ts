import { User } from "@/types";

export interface PopularPost {
	slug: string;
	title: string;
	coverImageUrl: string;
}

type Status = "draft" | "published";

export interface Post {
	title: string;
	content: string;
	coverImageUrl?: string;
	tags: string[];
	status: Status;
	author?: User;
	slug?: string;
	_id?: string;
	createdAt?: Date;
}

export type PostFormTypes = Omit<Post, "coverImageUrl" | "tags"> & {
	coverImageUrl: File[];
	tags: string;
};
