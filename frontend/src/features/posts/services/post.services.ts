import api from "@/lib/axios";
import { Post } from "../types";
import { getAuthHeader } from "@/lib/auth";

export const createPost = async (data: Post) => {
	const response = await api.post("/posts", data);
	return response.data;
};

export const updatePost = async (id: string, data: Partial<Post>) => {
	const response = await api.patch(`/posts/${id}`, data);
	return response.data;
};

export const deletePost = async (slug: string) => {
	const response = await api.delete(`/posts/${slug}`);
	return response.data;
};

export const getPost = async (slug: string) => {
	const response = await api.get(`/posts/${slug}`);
	return response.data;
};

export const getPosts = async (page?: Number, limit?: Number, search?: string) => {
	const response = await api.get(`/posts?page=${page}&limit=${limit}&search=${search}`);
	return response.data;
};

