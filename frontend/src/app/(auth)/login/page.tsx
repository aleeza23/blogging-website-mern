import Container from "@/components/layout/Container";
import LoginForm from "@/features/auth/components/LoginForm";

const page = () => {
	return (
		<Container className="flex min-h-screen items-center justify-center pt-24">
			<LoginForm />
		</Container>
	);
};

export default page;
