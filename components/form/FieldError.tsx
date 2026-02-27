import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldError[name]?.[0];
  return <span className="mt-2 text-primary">{message}</span>;
};
export { FieldError };
