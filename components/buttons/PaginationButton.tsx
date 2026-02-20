import clsx from "clsx";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type PaginationButtonProps = {
  label: string;
  icon?: "right" | "left";
  onClick: () => void;
};

const PaginationButton = ({
  label,
  icon = "right",
  onClick,
}: PaginationButtonProps) => {
  return (
    <Button
      className={clsx("text-[24px] flex gap-0 py-1.75 justify-center", {
        "pl-2.5": icon === "right",
        "pr-2.5": icon === "left",
      })}
      variant="default"
      size="none"
      onClick={onClick}
    >
      {icon === "left" && (
        <LucideChevronLeft
          strokeWidth={3.67}
          spacing={0}
          className="size-9 p-0"
        />
      )}
      {label}
      {icon === "right" && (
        <LucideChevronRight
          strokeWidth={3.67}
          spacing={0}
          className="size-9 pr-0.5 "
        />
      )}
    </Button>
  );
};

export { PaginationButton };
