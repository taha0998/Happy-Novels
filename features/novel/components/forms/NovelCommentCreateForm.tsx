"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createNovelComment } from "../../actions/create-novel-comment";

type NovelCreateFormProps = {
  novelId: string;
  handleSuccess: () => void;
};

const NovelCreateForm = ({ novelId, handleSuccess }: NovelCreateFormProps) => {
  const [actionState, action] = useActionState(
    createNovelComment.bind(null, novelId),
    EPMTY_ACTION_STATE,
  );
  return (
    <Form
      actionState={actionState}
      action={action}
      onSuccess={handleSuccess}
      className="flex flex-col"
    >
      <label className="text-[50px] font-medium mb-7.5">Comments:</label>
      <div className="max-w-325.75 relative">
        <Textarea
          placeholder="Type your comment here..."
          className="lg:text-[35px] pb-33.25"
          name="content"
        />
        <SubmitButton
          label="Comment"
          className="w-50 px-[27.5px] absolute bottom-7.5 right-7.5"
        />
      </div>
      <FieldError name="content" actionState={actionState} />
    </Form>
  );
};

export { NovelCreateForm };
