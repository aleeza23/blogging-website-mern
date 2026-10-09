import { cookies } from "next/headers";

export const getAuthHeader = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	console.log("Token received by Next.js:", Boolean(token));

	return token ? `token=${token}` : "";
};