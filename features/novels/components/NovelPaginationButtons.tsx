"use client";
import { useQueryStates } from "nuqs";
import { PaginationButton } from "@/components/buttons/PaginationButton";
import { paginationPageOptions, paginationPageParser } from "../SearchParams";

type NovelsPaginationButtonsProps = {
  novelsMetadata: { count: number; hasNext: boolean };
};

const NovelsPaginationButtons = ({
  novelsMetadata,
}: NovelsPaginationButtonsProps) => {
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
  console.log(novelsMetadata.hasNext);

  return (
    <div className="flex justify-center gap-4">
      {pagination.page > 0 && (
        <PaginationButton label="Prev 20" icon="left" onClick={handelPrev} />
      )}
      {novelsMetadata.hasNext && (
        <PaginationButton label="Next 20" onClick={handleNext} />
      )}
    </div>
  );
};

export { NovelsPaginationButtons };
