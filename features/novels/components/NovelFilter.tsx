"use client";
import { useState } from "react";
import { CustomButton } from "@/components/CustomButton";
import { CustomSearchInput } from "@/components/CustomSearchInput";
import { filterList } from "../constant";

const NovelFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Latest");
  return (
    <div className="flex flex-col gap-y-22.5">
      <div className=" flex justify-between items-center mt-20" id="id">
        <div className="flex gap-5">
          {filterList.map((filter) => (
            <CustomButton
              key={filter.label}
              variant={"outline"}
              label={filter.label}
              padding="px-9 py-6"
              fontSize="text-[25px] font-medium"
              active={filter.label === activeFilter}
              onClick={() => setActiveFilter(filter.label)}
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
