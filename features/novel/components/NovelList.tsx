import { getNovels } from "../queries/get-novels";
import { ParsedSearchParams } from "../searchParams";
import { NovelFilter } from "./filters/NovelFilter";
import { NovelItems } from "./NovelItems";

type NovelListProps = {
  searchParams: ParsedSearchParams;
};

const NovelList = async ({ searchParams }: NovelListProps) => {
  const { list: novels, metadata: novelsMetadata } =
    await getNovels(searchParams);

  return (
    <>
      <NovelFilter
        novels={novels}
        novelsMetadata={novelsMetadata}
        novelItems={<NovelItems novels={novels} searchParams={searchParams} />}
      />
    </>
  );
};
export { NovelList };
