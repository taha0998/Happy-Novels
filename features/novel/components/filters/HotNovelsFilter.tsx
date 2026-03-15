import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { CustomButton } from "@/components/CustomButton";
import { NovelHotFilterSkeleton } from "@/components/skeletons/NovelHotFilterSkeleton";
import { hotFilterTimeParser } from "../../searchParams";

const HotNovelsFilter = () => {
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
      {isPending ? (
        <NovelHotFilterSkeleton />
      ) : (
        <div className="flex gap-4">
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
      )}
    </>
  );
};
export { HotNovelsFilter };
