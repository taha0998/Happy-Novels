import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpPath } from "@/lib/paths";

const SignInForm = () => {
  return (
    <form
      action={"/"}
      className="w-[510.51px] flex flex-col items-center gap-5"
    >
      <Input
        placeholder="Email"
        name="email"
        id="email"
        className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
      />
      <Input
        placeholder="Password"
        name="password"
        id="password"
        type="password"
        className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
      />
      <div className="w-full">
        <Button
          size="none"
          className="text-[31.21px] w-full py-4 rounded-[9.71px]"
        >
          Sign In
        </Button>
        <span className="float-right mt-2.5 text-[16px]">
          Don’t have an account?{" "}
          <Link href={SignUpPath()} className="cursor-pointer text-primary">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
};
export { SignInForm };
