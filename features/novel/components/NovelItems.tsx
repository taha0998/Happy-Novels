"use client";
import { useQueryState } from "nuqs";
import { NovelFilterType } from "@/components/comments/types";
import { filterNovelsParser, ParsedSearchParams } from "../searchParams";
import { NovelHotItems } from "./NovelHotItems";
import { NovelItem } from "./NovelItem";
import { NovelTypes } from "./NovelTypes";

type NovelItemsProps = {
  novels: NovelFilterType[];
  searchParams: ParsedSearchParams;
};

const NovelItems = ({ novels, searchParams }: NovelItemsProps) => {
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
          <NovelTypes
            novels={novels}
            getNovel={getNovel}
            searchParams={searchParams}
          />
        </>
      ) : (
        novels.map((novel) => getNovel(novel))
      )}
    </>
  );
};

export { NovelItems };
