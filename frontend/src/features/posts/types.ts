export interface PopularPost {
	slug: string;
	title: string;
	coverImageUrl: string;
}

type Status = "draft" | "published";

export interface Post {
	title: string;
	content: string;
	coverImage?: string;
	tags: string[];
	status: Status;
}
