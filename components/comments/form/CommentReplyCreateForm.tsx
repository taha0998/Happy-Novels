import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { ActionState } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";

type CommentReplyCreateFormProps = {
  actionState: ActionState;
  action: (formData: FormData) => void;
  handleSuccess: () => void;
};

const CommentReplyCreateForm = ({
  actionState,
  action,
  handleSuccess,
}: CommentReplyCreateFormProps) => {
  return (
    <Form
      actionState={actionState}
      action={action}
      className="flex flex-col ml-27.5 py-7"
      onSuccess={handleSuccess}
    >
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
export { CommentReplyCreateForm };
