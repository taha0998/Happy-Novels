import { Button } from "../ui/button";

type ChapterButtonProps = {
  number: number;
};

const ChapterButton = ({ number }: ChapterButtonProps) => {
  const formattedNumber = number.toString().padStart(2, "0");

  return (
    <Button className="w-[148.36px] h-[148.36px] bg-foreground flex justify-center items-center rounded-[14.84px] cursor-pointer hover:bg-foreground/90">
      <p className="text-[89.02px] font-medium text-background">
        {formattedNumber}
      </p>
    </Button>
  );
};

export { ChapterButton };
