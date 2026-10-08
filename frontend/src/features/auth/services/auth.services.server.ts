import { getAuthHeader } from "@/lib/auth";
import api from "@/lib/axios";
import { User } from "@/types";

export const getUser = async (): Promise<User | null> => {
	const authHeader = await getAuthHeader();
	if (!authHeader) return null;

	const result = await api.get(`${process.env.API_URL}/auth/me`, {
		headers: {
			cookie: authHeader,
		},
	});
	console.log(result.data.data, "server user");

	return result.data.data;
};
