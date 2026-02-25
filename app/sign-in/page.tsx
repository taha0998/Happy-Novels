import { AuthCard } from "@/components/auth/components/AuthCard";
import { SignInForm } from "@/components/auth/components/SignInForm";

const SignInPage = () => {
  return (
    <AuthCard
      form={<SignInForm />}
      title="Welcome back"
      img="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNSgSvoipHaqWziGvYCXLgStIFVmR4PBsnybME"
    />
  );
};
export default SignInPage;
