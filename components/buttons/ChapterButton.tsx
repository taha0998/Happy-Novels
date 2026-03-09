import clsx from "clsx";
import { Button } from "../ui/button";

type ChapterButtonProps = {
  number: number;
};

const ChapterButton = ({ number }: ChapterButtonProps) => {
  const formattedNumber = number.toString().padStart(2, "0");
  const morethan99 = number > 99;

  return (
    <Button
      className={clsx(
        "w-[148.36px] h-[148.36px] bg-foreground flex justify-center items-center rounded-[14.84px] cursor-pointer hover:bg-foreground/90 active:bg-foreground/50",
        {
          "w-52.5": morethan99,
        },
      )}
    >
      <p className="text-[89.02px] font-medium text-background">
        {formattedNumber}
      </p>
    </Button>
  );
};

export { ChapterButton };
