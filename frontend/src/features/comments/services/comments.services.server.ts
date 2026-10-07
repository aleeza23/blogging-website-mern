import { getAuthHeader } from "@/lib/auth";
import api from "@/lib/axios";

export const getAllComments = async () => {
	const authHeader = await getAuthHeader();
	const response = await api.get(`/comment`, {
		headers: {
			cookie: authHeader,
		},
	});
	return response.data;
};
