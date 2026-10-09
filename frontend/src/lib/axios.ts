import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL:
		typeof window === "undefined"
			? process.env.API_URL
			: process.env.NEXT_PUBLIC_API_URL, //works on local not live

	// baseURL: typeof window === "undefined" ? process.env.API_URL : "/api", //works for live site not works on local

	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
