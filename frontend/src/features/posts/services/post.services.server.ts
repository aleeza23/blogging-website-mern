import { getAuthHeader } from "@/lib/auth";
import api from "@/lib/axios";

export const getUserPosts = async (
	page?: Number,
	limit?: Number,
	status?: string,
) => {
	const authHeader = await getAuthHeader();

	const response = await api.get(
		`/posts/my?page=${page}&limit=${limit}&status=${status}`,
		{
			headers: {
				cookie: authHeader,
			},
		},
	);
	return response.data;
};
