import api from "@/lib/axios";

export const uploadImage = async (file: File) => {
	const fd = new FormData();
	fd.append("coverImage", file);

	const response = await api.post("/upload", fd, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};
