"use client";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import {
  NovelFilterMetadata,
  NovelFilterType,
} from "@/components/comments/types";
import { NovelHotFilterSkeleton } from "@/components/skeletons/NovelHotFilterSkeleton";
import { NovelTypeFilterSkeleton } from "@/components/skeletons/NovelTypesFilterSkeleton";
import { filterList } from "../../constant";
import {
  filterNovelsParser,
  hotFilterTimeParser,
  searchParser,
  typeFilterParser,
} from "../../searchParams";
import { NovelNextPagination } from "../NovelNextPagination";
import { NovelPrevPagination } from "../NovelPrevPagination";
import { NovelsSkeleton } from "../NovelsSkeleton";
import { NovelFilterBar } from "./NovelFilterBar";
import { NovelSearchInput } from "./NovelSearchInput";

type NovelFilterProps = {
  novels: NovelFilterType[];
  novelsMetadata: NovelFilterMetadata;
  novelItems: React.ReactElement;
};

const NovelFilter = ({
  novels,
  novelsMetadata,
  novelItems,
}: NovelFilterProps) => {
  const [isPending, startTransition] = useTransition();
  const [filterNovels, setFilterNovels] = useQueryState(
    "filterNovels",
    filterNovelsParser,
  );
  const [typeNovels, setTypeNovels] = useQueryState(
    "typeNovels",
    typeFilterParser,
  );
  const [filterTime, setFilterTime] = useQueryState(
    "hotFilterTime",
    hotFilterTimeParser,
  );
  const [searchPending, searchTransition] = useTransition();
  const [search, setSearch] = useQueryState("search", searchParser);

  const [clicked, setClicked] = useState(false);
  const times = ["day", "week", "month"];
  const noSkeletonFilters = ["hot", "types"];

  const handleClick = (filter: { label: string; filterKey: string }) => {
    setFilterNovels(filter.filterKey, { startTransition });
    setClicked(true);
    if (filterNovels === "types" && typeNovels !== "") {
      setTypeNovels("");
    }
    if (filterNovels !== "hot") {
      setFilterTime("");
    }
    if (filterNovels === "hot" && times.includes(filterTime)) {
      setFilterTime("");
    }
  };

  useEffect(() => {
    if (!filterList.some((i) => i.filterKey === filterNovels)) {
      setFilterNovels("highest_rate");
    }
  }, [setFilterNovels, filterNovels]);

  return (
    <>
      <NovelFilterBar
        filterList={filterList}
        clicked={clicked}
        filterNovels={filterNovels}
        handleClick={handleClick}
        NovelSearchInput={
          <NovelSearchInput
            search={search}
            setSearch={setSearch}
            startTransition={searchTransition}
          />
        }
      />
      <div className="min-h-140">
        {isPending || searchPending ? (
          <>
            {!noSkeletonFilters.includes(filterNovels) && <NovelsSkeleton />}
            {filterNovels === "hot" && <NovelHotFilterSkeleton />}
            {filterNovels === "types" && <NovelTypeFilterSkeleton />}
          </>
        ) : (
          <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 animate-fade-in-top ">
            {novelItems}
            <div className="w-full mt-2.5 flex justify-center gap-4 ">
              {<NovelPrevPagination />}
              {novels.length === 20 && novelsMetadata.hasNext && (
                <NovelNextPagination />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export { NovelFilter };
