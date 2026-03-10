"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createChapterTest } from "@/features/chapter/actions/create-chapter-test";

const CreateChapterTest = () => {
  const [actionState, action] = useActionState(
    createChapterTest,
    EPMTY_ACTION_STATE,
  );
  return (
    <div className="flex flex-1 justify-center items-center">
      <Form
        action={action}
        actionState={actionState}
        className="flex flex-col gap-4 w-150"
      >
        <Input placeholder="Title" name="title" />
        <FieldError actionState={actionState} name="title" />

        <Input type="number" placeholder="Number" name="number" />
        <FieldError actionState={actionState} name="number" />

        <Textarea placeholder="Content" name="content" />
        <FieldError actionState={actionState} name="content" />

        <SubmitButton label="Confirm" />
      </Form>
    </div>
  );
};
export default CreateChapterTest;
