import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { NovelFilterType } from "@/components/comments/types";
import { CustomButton } from "@/components/CustomButton";
import { hotFilterTimeParser } from "../searchParams";
import { NovelsSkeleton } from "./NovelsSkeleton";

type NovelHotItemsProps = {
  novels: NovelFilterType[];
  getNovel: (novel: NovelFilterType) => React.ReactElement;
};

const NovelHotItems = ({ novels, getNovel }: NovelHotItemsProps) => {
  const [isPending, startTransition] = useTransition();
  const [filterTime, setFilterTime] = useQueryState(
    "hotFilterTime",
    hotFilterTimeParser,
  );

  const handleClick = (time: string) => {
    setFilterTime(time, { startTransition });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-4 mb-15">
          <CustomButton
            variant={"outline"}
            label={"day"}
            padding="px-9 py-6"
            fontSize="text-[25px] font-medium"
            active={filterTime === "day"}
            onClick={() => handleClick("day")}
          />
          <CustomButton
            variant={"outline"}
            label={"week"}
            padding="px-9 py-6"
            fontSize="text-[25px] font-medium"
            active={filterTime === "week" || filterTime === ""}
            onClick={() => handleClick("week")}
          />
          <CustomButton
            variant={"outline"}
            label={"month"}
            padding="px-9 py-6"
            fontSize="text-[25px] font-medium"
            active={filterTime === "month"}
            onClick={() => handleClick("month")}
          />
        </div>
        {isPending ? (
          <NovelsSkeleton />
        ) : (
          <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 animate-fade-in-top">
            {novels.map((novel) => getNovel(novel))}
          </div>
        )}
      </div>
    </>
  );
};
export { NovelHotItems };
