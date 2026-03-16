"use client";
import clsx from "clsx";
import { CustomButton } from "@/components/CustomButton";
import { CustomSearchInput } from "@/components/CustomSearchInput";

type Filter = {
  label: string;
  filterKey: string;
};

type NovelFilterBarProps = {
  filterList: Filter[];
  filterNovels: string;
  handleClick: (filter: Filter) => void;
  clicked: boolean;
};

const NovelFilterBar = ({
  filterList,
  filterNovels,
  handleClick,
  clicked,
}: NovelFilterBarProps) => {
  return (
    <>
      <div
        className={clsx("flex flex-col gap-y-22.5 mb-15 ", {
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
                onClick={() => handleClick(filter)}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <CustomSearchInput />
          </div>
        </div>
      </div>
    </>
  );
};
export { NovelFilterBar };
