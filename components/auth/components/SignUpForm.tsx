"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/sign-up";
import { SignInPath } from "@/lib/paths";
import { useShowPassword } from "../hooks/useShowPassword";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EPMTY_ACTION_STATE);

  const [passwordEyeIcon, passwordType] = useShowPassword();
  const [confirmPasswordIcon, confirmPasswordType] = useShowPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        {password.length > 0 && passwordEyeIcon}
        <FieldError actionState={actionState} name="password" />
      </div>

      <div className="w-full relative">
        <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          type={confirmPasswordType}
          className={inputClassName}
          defaultValue={actionState.payload?.get("confirmPassword") as string}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword.length > 0 && confirmPasswordIcon}
        <FieldError actionState={actionState} name="confirmPassword" />
      </div>

      <div className="w-full">
        <SubmitButton label="Sign Up" />
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
