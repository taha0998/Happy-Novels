import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { CustomButton } from "@/components/CustomButton";
import { hotFilterTimeParser } from "../searchParams";
import { Novel } from "./NovelItems";
import { NovelsSkeleton } from "./NovelsSkeleton";

type NovelHotItemsProps = {
  novels: Novel[];
  getNovel: (novel: Novel) => React.ReactElement;
};

const NovelHotItems = ({ novels, getNovel }: NovelHotItemsProps) => {
  const [isPending, startTransition] = useTransition();
  const times = ["day", "week", "month"];
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
          {times.map((time) => {
            return (
              <CustomButton
                key={time}
                variant={"outline"}
                label={time}
                padding="px-9 py-6"
                fontSize="text-[25px] font-medium"
                active={time === filterTime}
                onClick={() => handleClick(time)}
              />
            );
          })}
        </div>
        {filterTime == "" && <div className="h-125 w-12.5"></div>}
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
