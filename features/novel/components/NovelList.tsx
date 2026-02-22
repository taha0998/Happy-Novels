import { getNovels } from "../queries/get-novels";
import { ParsedSearchParams } from "../SearchParams";
import { NovelItem } from "./NovelItem";
import { NovelNextPagination } from "./NovelNextPagination";
import { NovelPrevPagination } from "./NovelPrevPagination";

type NovelListProps = {
  searchParams: ParsedSearchParams;
};

const NovelList = async ({ searchParams }: NovelListProps) => {
  const { list: novels, metadata: novelsMetadata } =
    await getNovels(searchParams);
  console.log(novels, novels.length, novelsMetadata.count);

  return (
    <>
      <div className="w-full flex  flex-wrap gap-x-29.25 gap-y-15 mt-15 animate-fade-in-top">
        {novels.map((novel) => (
          <NovelItem
            key={novel.id}
            id={novel.id}
            title={novel.title}
            coverImg={novel.coverImg}
            rating={novel.rating}
            ratingCount={novel.ratingCount}
          />
        ))}
        <div className="w-full mt-2.5 flex justify-center gap-4 ">
          {<NovelPrevPagination />}
          {novels.length === 20 && novelsMetadata.hasNext && (
            <NovelNextPagination />
          )}
        </div>
      </div>
    </>
  );
};
export { NovelList };
