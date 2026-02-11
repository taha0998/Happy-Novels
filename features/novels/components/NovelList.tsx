import { getNovels } from "../queries/get-novels";
import { NovelItem } from "./NovelItem";

const NovelList = async () => {
  const novels = await getNovels();

  return (
    <div className="w-full flex flex-wrap gap-x-29.25 gap-y-20 mt-15">
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
  );
};
export { NovelList };
