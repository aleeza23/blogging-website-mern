import { User } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getUser = async (): Promise<User | null> => {
	const cookieStore = await cookies();

	const authHeader = cookieStore
		.getAll()
		.map(({ name, value }) => `${name}=${value}`)
		.join("; ");

	const result = await axios.get(`${process.env.API_URL}/auth/me`, {
		headers: {
			cookie: authHeader,
		},
	});

	return result.data.data;
};
