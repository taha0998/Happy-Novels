import { getNovels } from "../queries/get-novels";
import { ParsedSearchParams } from "../SearchParams";
import { NovelItem } from "./NovelItem";

type NovelListProps = {
  searchParams: ParsedSearchParams;
};

const NovelList = async ({ searchParams }: NovelListProps) => {
  const novels = await getNovels(searchParams);

  return (
    <>
      <div className="w-full flex  flex-wrap gap-x-29.25 gap-y-20 mt-15">
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
      </div>
    </>
  );
};
export { NovelList };
