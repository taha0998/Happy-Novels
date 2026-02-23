"use client";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { chaptersPaginationParser } from "../searchParams";

type NovelChapterPaginationProps = {
  count: number;
};

const NovelChapterPagination = ({ count }: NovelChapterPaginationProps) => {
  const size = 50;
  const paginationPages = Math.ceil(count / size);

  const [chapterPage, setChapterPage] = useQueryState(
    "chaptersPage",
    chaptersPaginationParser,
  );
  const handleClick = (page: number) => {
    setChapterPage(page);
  };

  return (
    <div className="flex flex-wrap justify-start mt-7 gap-x-5 gap-y-2.5">
      {Array.from({ length: paginationPages }).map((_, index) => {
        const start = size * index + 1;
        const end = Math.min(count, size * (index + 1));

        const isActive = chapterPage == index;

        return (
          <Button
            key={index}
            size="none"
            className="p-2"
            variant={isActive ? "default" : "outline"}
            onClick={() => handleClick(index)}
          >
            <p className="text-[26px]">
              {start}-{end}
            </p>
          </Button>
        );
      })}
    </div>
  );
};

export { NovelChapterPagination };
