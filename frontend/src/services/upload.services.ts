import api from "@/lib/axios";

export const uploadImage = async (
	file: File,
	options?: {
		onProgress?: (progress: number) => void;
		signal?: AbortSignal;
	},
) => {
	const fd = new FormData();
	fd.append("coverImage", file);

	const response = await api.post("/upload", fd, {
		headers: { "Content-Type": "multipart/form-data" },
		signal: options?.signal,
		onUploadProgress: (e) => {
			if (!e.total) return;
			options?.onProgress?.(Math.round((e.loaded / e.total) * 100));
		},
	});
	return response.data;
};
