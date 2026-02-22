"use client";
import { useQueryState } from "nuqs";
import { PaginationButton } from "@/components/buttons/PaginationButton";
import { paginationPageParser } from "../SearchParams";

type NovelsPaginationButtonsProps = {
  type: "Next" | "Prev";
};

const NovelsPaginationButtons = ({ type }: NovelsPaginationButtonsProps) => {
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
    <div>
      {type === "Prev" && page > 0 && (
        <PaginationButton label="Prev 20" icon="left" onClick={handelPrev} />
      )}
      {type === "Next" && (
        <PaginationButton label="Next 20" onClick={handleNext} />
      )}
    </div>
  );
};

export { NovelsPaginationButtons };
