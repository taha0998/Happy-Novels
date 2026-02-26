"use client";
import Link from "next/link";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/sign-up";
import { SignInPath } from "@/lib/paths";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EPMTY_ACTION_STATE);
  return (
    <Form
      actionState={actionState}
      action={action}
      className="w-[510.51px] flex flex-col items-center gap-5"
    >
      <div className="w-full">
        <Input
          placeholder="Email"
          name="email"
          id="email"
          className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
          defaultValue={actionState.payload?.get("email") as string}
        />
        <FieldError actionState={actionState} name="email" />
      </div>
      <div className="w-full">
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
          defaultValue={actionState.payload?.get("password") as string}
        />
        <FieldError actionState={actionState} name="password" />
      </div>
      <div className="w-full">
        <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
          defaultValue={actionState.payload?.get("confirmPassword") as string}
        />
        <FieldError actionState={actionState} name="confirmPassword" />
      </div>
      <div className="w-full">
        <SubmitButton />
        <span className="float-right mt-2.5 text-[16px]">
          Already have an account?{" "}
          <Link href={SignInPath()} className="cursor-pointer text-primary">
            Sign In
          </Link>
        </span>
      </div>
    </Form>
  );
};
export { SignUpForm };
