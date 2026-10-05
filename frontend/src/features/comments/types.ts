export interface Comment {
	_id: string;
	comment: string;
	author: {
		avatarUrl: string;
		firstName: string;
		lastName: string;
	};
	post: {
		title: string;
	};
	createdAt: Date;
}
