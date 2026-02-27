"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "@/features/auth/actions/sign-in";
import { SignUpPath } from "@/lib/paths";
import { useShowPassword } from "../hooks/useShowPassword";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EPMTY_ACTION_STATE);

  const [eyeIcon, passwordType] = useShowPassword();

  const [password, setPassword] = useState("");

  const inputClassName =
    "border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]";
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
          className={inputClassName}
          defaultValue={actionState.payload?.get("email") as string}
        />
        <FieldError actionState={actionState} name="email" />
      </div>

      <div className="w-full relative">
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type={passwordType}
          className={inputClassName}
          defaultValue={actionState.payload?.get("password") as string}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password.length > 0 && eyeIcon}
        <FieldError actionState={actionState} name="password" />
      </div>

      <div className="w-full">
        <SubmitButton label="Sign In" />
        <span className="float-right mt-2.5 text-[16px]">
          Don’t have an account?{" "}
          <Link href={SignUpPath()} className="cursor-pointer text-primary">
            Sign Up
          </Link>
        </span>
      </div>
    </Form>
  );
};
export { SignInForm };
