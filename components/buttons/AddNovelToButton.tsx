"use client";
import clsx from "clsx";
import { LucideLoaderCircle, LucideMinus, LucidePlus } from "lucide-react";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { AddNovelToFavorite } from "@/features/novel/actions/add-novel-to-favorite";
import { toastStyle } from "@/utils/toastStyle";
import { useActionFeedback } from "../form/hooks/useActionFeedback";
import { EPMTY_ACTION_STATE } from "../form/utils/to-action-state";
import { Button } from "../ui/button";

type AddNovelToButtonProps = {
  to: string;
  isAdded: boolean;
};

const AddNovelToButton = ({ to, isAdded }: AddNovelToButtonProps) => {
  console.log(isAdded);
  const [added, setAdded] = useState(isAdded);
  const [actionState, action, isPending] = useActionState(
    AddNovelToFavorite.bind(null, "cmmjb024p0001vhtkbu55m5in"),
    EPMTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message, toastStyle);
      }
      // onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message.includes("Unique constraint failed")) {
        toast.info("This novel is already in your favorites", toastStyle);
        setAdded(true);
      } else if (actionState.message) {
        toast.error(actionState.message, toastStyle);
      }
    },
  });

  return (
    <>
      <form action={action}>
        <Button
          className={clsx(
            "flex gap-2 justify-center items-center text-background cursor-pointer relative hover:bottom-0.5 hover:bg-foreground min-w-95 min-h-25.5 rounded-[7px]",
            {
              "bg-foreground": added,
              "bg-[#E70000] hover:bg-[#E70000] min-w-123": !added,
            },
          )}
          type="submit"
        >
          {isPending ? (
            <>
              <LucideLoaderCircle className="size-12 animate-spin" />
              <span className="text-[35px]">Loading...</span>
            </>
          ) : added ? (
            <>
              <LucidePlus className="size-12" />
              <span className="text-[35px]">Add to {to}</span>
            </>
          ) : (
            <>
              <LucideMinus className="size-12" />
              <span className="text-[35px]">Remove from {to}</span>
            </>
          )}
          {/* <span className="text-[35px]">
            {!added ? `Add to ${to}` : `Remove from ${to}`}
          </span> */}
        </Button>
      </form>
    </>
  );
};
export { AddNovelToButton };
