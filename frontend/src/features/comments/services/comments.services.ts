import api from "@/lib/axios";

export const createComment = async (postId: string, comment: string) => {
	const response = await api.post(`/comment/${postId}`, { comment });
	return response.data;
};

export const deleteComment = async (commentId: string) => {
	const response = await api.delete(`/comment/${commentId}`);
	return response.data;
};

export const getComments = async (postId: string) => {
	const response = await api.get(`/comment/${postId}`);
	return response.data;
};

export const getAllComments = async () => {
	const response = await api.get(`/comment`);
	return response.data;
};
