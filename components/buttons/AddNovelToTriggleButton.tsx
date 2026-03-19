import { LucideBookmarkPlus } from "lucide-react";

const AddNovelToTriggleButton = () => {
  return (
    <>
      <div
        className="absolute right-5 top-11 w-25.5 h-13.75
                    rounded-[5px] bg-background/88 cursor-pointer
                    flex gap-1 justify-center items-center text-center "
      >
        <span className="text-[26.73px] font-medium">Add</span>
        <LucideBookmarkPlus strokeWidth={3} />
      </div>
    </>
  );
};
export { AddNovelToTriggleButton };
