"use client";
import { useQueryState } from "nuqs";
import { useEffect, useTransition } from "react";
import { CustomButton } from "@/components/CustomButton";
import { CustomSearchInput } from "@/components/CustomSearchInput";
import { filterList } from "../constant";
import { filterNovelsParser } from "../searchParams";

const NovelFilter = () => {
  const [filterNovels, setFilterNovels] = useQueryState(
    "filterNovels",
    filterNovelsParser,
  );
  const [, startTransition] = useTransition();

  const handelClick = (filter: { label: string; filterKey: string }) => {
    setFilterNovels(filter.filterKey, { startTransition });
  };

  useEffect(() => {
    if (!filterList.some((i) => i.filterKey === filterNovels)) {
      setFilterNovels("highest_rate");
    }
  }, [setFilterNovels, filterNovels]);
  return (
    <div
      className="flex flex-col gap-y-22.5 animate-fade-in-top"
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
  );
};
export { NovelFilter };
