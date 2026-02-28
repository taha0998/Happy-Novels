"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProfile } from "@/features/auth/actions/create-profile";

const ProfileModule = () => {
  const [actionState, action] = useActionState(
    createProfile,
    EPMTY_ACTION_STATE,
  );
  return (
    <div className=" top-0 left-0 z-2 fixed bg-background/70 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-background w-161.25 h-[819] rounded-[10px]">
        <Form actionState={actionState} action={action}>
          <h2 className=" italic text-[55px] mb-12.5">Create your profile</h2>
          <div>
            <Input
              placeholder="Username"
              name="username"
              id="username"
              className="border-[1.27px] lg:text-[20.5px] border-foreground py-7 pl-5  placeholder:text-foreground/50 placeholder:text-[20.5px] rounded-[8.88px]"
              defaultValue={actionState.payload?.get("username") as string}
            />
            <FieldError actionState={actionState} name="username" />
          </div>
          <div className="flex flex-col justify-center items-center gap-5 mt-7.5">
            <div className="bg-[#D9D9D9] w-59 h-59 rounded-full"></div>
            <Button
              className="bg-foreground text-[27px] px-6 py-2.5"
              size="none"
              type="button"
            >
              Upload Img
            </Button>
          </div>
          <SubmitButton label="Create" className="mt-15" />
        </Form>
      </div>
    </div>
  );
};

export { ProfileModule };
