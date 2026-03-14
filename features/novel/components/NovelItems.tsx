"use client";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { filterNovelsParser, hotFilterTimeParser } from "../searchParams";
import { HotNovelsFilter } from "./filters/HotNovelsFilter";
import { NovelItem } from "./NovelItem";

type NovelItemsProps = {
  novels: {
    title: string;
    LastChapter: {
      number: number;
    } | null;
    id: string;
    coverImg: string;
    rating: number;
    ratingCount: number;
    _count: {
      ChapterView: number;
    };
  }[];
};

const NovelItems = ({ novels }: NovelItemsProps) => {
  const [filterNovels] = useQueryState("filterNovels", filterNovelsParser);
  const [filterTime, setFilterTime] = useQueryState(
    "hotFilterTime",
    hotFilterTimeParser,
  );

  useEffect(() => {
    if (filterTime && filterNovels !== "hot") {
      setFilterTime("");
    }
  }, [filterTime, setFilterTime, filterNovels]);

  return (
    <>
      {filterNovels === "hot" ? (
        <div className="flex flex-col">
          <HotNovelsFilter />
          <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 mt-15 animate-fade-in-top">
            {novels.map((novel) => (
              <NovelItem
                key={novel.id}
                id={novel.id}
                title={novel.title}
                coverImg={novel.coverImg}
                rating={novel.rating}
                ratingCount={novel.ratingCount}
                lastChapter={novel.LastChapter?.number}
                totalViews={novel._count.ChapterView}
              />
            ))}
          </div>
        </div>
      ) : filterNovels === "types" ? (
        <>types</>
      ) : (
        novels.map((novel) => (
          <NovelItem
            key={novel.id}
            id={novel.id}
            title={novel.title}
            coverImg={novel.coverImg}
            rating={novel.rating}
            ratingCount={novel.ratingCount}
            lastChapter={novel.LastChapter?.number}
            totalViews={novel._count.ChapterView}
          />
        ))
      )}
    </>
  );
};

export { NovelItems };
