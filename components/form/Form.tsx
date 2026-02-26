import { toast } from "sonner";
import { useActionFeedback } from "./hooks/useActionFeedback";
import { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  className?: string;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({
  action,
  actionState,
  children,
  className,
  onSuccess,
  onError,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message, {
          style: { backgroundColor: "#efeeea", fontSize: "17px" },
          position: "top-left",
        });
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message, { position: "top-left" });
      }
      onError?.(actionState);
    },
  });

  return (
    <form action={action} className={className}>
      {children}
    </form>
  );
};

export { Form };
