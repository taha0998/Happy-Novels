import { getNovels } from "../queries/get-novels";
import { ParsedSearchParams } from "../searchParams";
import { NovelFilter } from "./filters/NovelFilter";

type NovelListProps = {
  searchParams: ParsedSearchParams;
};

const NovelList = async ({ searchParams }: NovelListProps) => {
  const { list: novels, metadata: novelsMetadata } =
    await getNovels(searchParams);

  return (
    <>
      <NovelFilter novels={novels} novelsMetadata={novelsMetadata} />
    </>
  );
};
export { NovelList };
