"use client";
import { useQueryState } from "nuqs";
import { PaginationButton } from "@/components/buttons/PaginationButton";
import { paginationPageParser } from "../SearchParams";

type NovelsPaginationButtonsProps = {
  novelsMetadata: { count: number; hasNext: boolean };
};

const NovelsPaginationButtons = ({
  novelsMetadata,
}: NovelsPaginationButtonsProps) => {
  const [page, setPagination] = useQueryState("page", paginationPageParser);

  const scrollTop = () => {
    const filterBar = document.getElementById("filter-bar");
    filterBar?.scrollIntoView();
  };

  const handleNext = () => {
    setPagination(page + 1);
    scrollTop();
  };

  const handelPrev = () => {
    setPagination(page - 1);
    scrollTop();
  };

  return (
    <div className="flex justify-center gap-4">
      {page > 0 && (
        <PaginationButton label="Prev 20" icon="left" onClick={handelPrev} />
      )}
      {novelsMetadata.hasNext && (
        <PaginationButton label="Next 20" onClick={handleNext} />
      )}
    </div>
  );
};

export { NovelsPaginationButtons };
