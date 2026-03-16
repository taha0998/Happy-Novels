"use client";
import { useQueryState } from "nuqs";
import { NovelFilterType } from "@/components/comments/types";
import { filterNovelsParser } from "../searchParams";
import { NovelHotItems } from "./NovelHotItems";
import { NovelItem } from "./NovelItem";
import { NovelTypes } from "./NovelTyes";

type NovelItemsProps = {
  novels: NovelFilterType[];
};

const NovelItems = ({ novels }: NovelItemsProps) => {
  const [filterNovels] = useQueryState("filterNovels", filterNovelsParser);

  const getNovel = (novel: NovelFilterType) => {
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

  return (
    <>
      {filterNovels === "hot" ? (
        <NovelHotItems novels={novels} getNovel={getNovel} />
      ) : filterNovels === "types" ? (
        <>
          <NovelTypes />
          <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 animate-fade-in-top">
            {novels.map((novel) => getNovel(novel))}
          </div>
        </>
      ) : (
        novels.map((novel) => getNovel(novel))
      )}
    </>
  );
};

export { NovelItems };
