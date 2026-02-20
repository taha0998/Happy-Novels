"use client";
import { useQueryStates } from "nuqs";
import { PaginationButton } from "@/components/buttons/PaginationButton";
import { paginationPageOptions, paginationPageParser } from "../SearchParams";

const NovelsPaginationButtons = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationPageParser,
    paginationPageOptions,
  );

  const scrollTop = () => {
    const filterBar = document.getElementById("filter-bar");
    filterBar?.scrollIntoView();
  };

  const handleNext = () => {
    setPagination({ ...pagination, page: pagination.page + 1 });
    scrollTop();
  };

  const handelPrev = () => {
    setPagination({ ...pagination, page: pagination.page - 1 });
    scrollTop();
  };

  return (
    <div className="flex justify-center gap-4 mt-[90px]">
      <PaginationButton label="Prev 20" icon="left" onClick={handelPrev} />
      <PaginationButton label="Next 20" onClick={handleNext} />
    </div>
  );
};

export { NovelsPaginationButtons };
