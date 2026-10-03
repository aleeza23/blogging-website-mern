import sanitize from "sanitize-html";

export const sanitizeHtml = (html: string) => {
	return sanitize(html, {
		allowedTags: sanitize.defaults.allowedTags.concat([
			"img",
			"h1",
			"h2",
			"u",
			"s",
			"mark",
			"sub",
			"sup",
		]),
	});
};
