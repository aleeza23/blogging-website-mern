import { getCurrentUser } from "@/features/auth/services/auth.service";
import { cookies } from "next/headers";

export const getUser = async () => {
	const cookieStore = await cookies();

	const authHeader = cookieStore.get("token")?.value;
    

	const result = await getCurrentUser(authHeader);

	return result.data;
};
