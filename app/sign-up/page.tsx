import { AuthCard } from "@/components/auth/components/AuthCard";
import { SignUpForm } from "@/components/auth/components/SignUpForm";

const SignUpPage = () => {
  return (
    <AuthCard
      form={<SignUpForm />}
      title="Create your account"
      img="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNzSNTLXflRbkGJp1tN2PC5WaLxHBD7TqQOgc9"
    />
  );
};
export default SignUpPage;
