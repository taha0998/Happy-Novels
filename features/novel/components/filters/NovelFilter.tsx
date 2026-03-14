"use client";
import clsx from "clsx";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import { CustomButton } from "@/components/CustomButton";
import { CustomSearchInput } from "@/components/CustomSearchInput";
import { NovelFilterSkeleton } from "@/components/skeletons/NovelFilterSkeleton";
import { filterList } from "../../constant";
import { filterNovelsParser } from "../../searchParams";

const NovelFilter = () => {
  const [filterNovels, setFilterNovels] = useQueryState(
    "filterNovels",
    filterNovelsParser,
  );

  const [clicked, setClicked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handelClick = (filter: { label: string; filterKey: string }) => {
    setFilterNovels(filter.filterKey, { startTransition });
    setClicked(true);
  };

  useEffect(() => {
    if (!filterList.some((i) => i.filterKey === filterNovels)) {
      setFilterNovels("highest_rate");
    }
  }, [setFilterNovels, filterNovels]);

  return (
    <>
      {!isPending ? (
        <div
          className={clsx("flex flex-col gap-y-22.5 ", {
            "animate-fade-in-top": clicked === false,
          })}
          id="filter-bar"
        >
          <div className=" flex justify-between items-center mt-20" id="id">
            <div className="flex gap-5">
              {filterList.map((filter) => (
                <CustomButton
                  key={filter.label}
                  variant={"outline"}
                  label={filter.label}
                  padding="px-9 py-6"
                  fontSize="text-[25px] font-medium"
                  active={filter.filterKey === filterNovels}
                  onClick={() => handelClick(filter)}
                />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <CustomSearchInput />
            </div>
          </div>
        </div>
      ) : (
        <NovelFilterSkeleton />
      )}
    </>
  );
};
export { NovelFilter };
