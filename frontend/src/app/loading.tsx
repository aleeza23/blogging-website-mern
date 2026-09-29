const Loading = () => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div role="status" className="relative w-12 animate-spin">
				<div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-primary" />

				<div className="absolute top-1/2 right-0 h-4 w-4 rounded-full bg-sky-500" />

				<span className="sr-only">Loading…</span>
			</div>
		</div>
	);
};

export default Loading;
