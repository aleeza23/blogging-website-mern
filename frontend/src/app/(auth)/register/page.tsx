import Container from "@/components/layout/Container";
import RegisterForm from "@/features/auth/components/RegisterForm";

const page = () => {
	return (
		<Container className="flex min-h-screen items-center justify-center pb-10 pt-32">
			<RegisterForm />
		</Container>
	);
};

export default page;
