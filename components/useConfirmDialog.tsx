"use client";
import {
  cloneElement,
  HTMLAttributes,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toastStyle } from "@/utils/toastStyle";
import { useActionFeedback } from "./form/hooks/useActionFeedback";
import { ActionState, EPMTY_ACTION_STATE } from "./form/utils/to-action-state";
import { Button } from "./ui/button";

type ConfirmDialogProps = {
  title?: string;
  content?: string;
  trigger: React.ReactElement<HTMLAttributes<HTMLElement>>;
  action: () => Promise<ActionState>;
  onSuccess?: () => Promise<void>;
};

export const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  content = "This action cannot be undone. Make sure you understand the consequences.",
  trigger,
  action,
  onSuccess,
}: ConfirmDialogProps) => {
  const [isOpen, setOpen] = useState(false);
  const [actionState, formAction, isPending] = useActionState(
    action,
    EPMTY_ACTION_STATE,
  );

  const confirmButton = cloneElement(trigger, {
    onClick: () => setOpen((state) => !state),
  });

  useEffect(() => {
    if (isPending) {
      toast.loading("Deleting Comment...", toastStyle);
    } else {
      toast.dismiss();
    }
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message, toastStyle);
      }
      onSuccess?.();
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message, toastStyle);
      }
    },
  });

  const confirmDialog = (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-background min-w-200 min-h-30 p-8">
        <AlertDialogHeader className="gap-3">
          <AlertDialogTitle className="text-[35px]">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[25px]">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4 pt-10 text-[25px]">
          <AlertDialogCancel className="text-[25px] h-14 w-33">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className=" text-[25px] h-14 w-44" asChild>
            <form action={formAction}>
              <Button type="submit">
                <span className="text-[25px]">Confirm</span>
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [confirmButton, confirmDialog];
};
