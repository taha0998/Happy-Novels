"use client";
import { useQueryState } from "nuqs";
import { useEffect, useTransition } from "react";
import { filterNovelsParser, hotFilterTimeParser } from "../searchParams";
import { TypeNovelsFilter } from "./filters/TypeNovelsFilter";
import { NovelHotItems } from "./NovelHotItems";
import { NovelItem } from "./NovelItem";
import { NovelsSkeleton } from "./NovelsSkeleton";

export type Novel = {
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
};

type NovelItemsProps = {
  novels: Novel[];
};

const NovelItems = ({ novels }: NovelItemsProps) => {
  const [isPending, startTransition] = useTransition();
  const [filterNovels] = useQueryState("filterNovels", filterNovelsParser);
  const [filterTime, setFilterTime] = useQueryState(
    "hotFilterTime",
    hotFilterTimeParser,
  );

  const getNovel = (novel: Novel) => {
    return (
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
    );
  };

  useEffect(() => {
    if (filterNovels !== "hot") {
      setFilterTime("", { startTransition });
    }
  }, [filterTime, setFilterTime, filterNovels]);

  if (isPending) {
    return <NovelsSkeleton />;
  }

  return (
    <>
      {filterNovels === "hot" ? (
        <NovelHotItems novels={novels} getNovel={getNovel} />
      ) : filterNovels === "types" ? (
        <>
          <TypeNovelsFilter />
        </>
      ) : (
        novels.map((novel) => getNovel(novel))
      )}
    </>
  );
};

export { NovelItems };
