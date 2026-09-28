import api from "@/lib/axios";
import { Post } from "../types";

export const createPost = async (data: Post) => {
	const response = await api.post("/posts", data);
	return response.data;
};

export const updatePost = async (id: string, data: Partial<Post>) => {
	const response = await api.patch(`/posts/${id}`, data);
	return response.data;
};

export const deletePost = async (id: string) => {
	const response = await api.delete(`/posts/${id}`);
	return response.data;
};

export const getPost = async (slug: string) => {
	const response = await api.get(`/posts/${slug}`);
	return response.data;
};

export const getPosts = async () => {
	const response = await api.get("/posts");
	return response.data;
};
