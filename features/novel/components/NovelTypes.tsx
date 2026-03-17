import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";
import { NovelFilterType } from "@/components/comments/types";
import { NovelTypeFilterSkeleton } from "@/components/skeletons/NovelTypesFilterSkeleton";
import { getTypes } from "@/features/chapter/queries/get-types";
import { getTypeCount } from "@/features/chapter/queries/getTypeCount";
import {
  filterNovelsParser,
  ParsedSearchParams,
  typeFilterParser,
} from "../searchParams";
import { NovelTypeFilter } from "./filters/NovelTypeFilter";
import { SelectedNovelType } from "./filters/SelectedNovelType";
import { NovelsSkeleton } from "./NovelsSkeleton";

export type TypeWithCount = {
  id: string;
  name: string;
  _count: { linkTypeNovels: number };
};

type NovelTypesProps = {
  novels: NovelFilterType[];
  getNovel: (novel: NovelFilterType) => React.ReactElement;
  searchParams: ParsedSearchParams;
};

const NovelTypes = ({ novels, getNovel, searchParams }: NovelTypesProps) => {
  const [types, setTypes] = useState<TypeWithCount[] | undefined>([]);
  const [count, setCount] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const [constLoading, setCountLoading] = useState(true);
  const [NovelPending, startTransition] = useTransition();

  const [filterNovels] = useQueryState("filterNovels", filterNovelsParser);
  const [typeNovels, setTypeNovels] = useQueryState(
    "typeNovels",
    typeFilterParser,
  );

  useEffect(() => {
    if (typeNovels === "" && filterNovels === "types") {
      const fetchTypes = async () => {
        try {
          const types = await getTypes();
          setTypes(types);
        } catch (error) {
          console.error("Fail to fetch types:", error);
        } finally {
          setLoading(false);
          setCountLoading(false);
        }
      };
      fetchTypes();
    }
  }, [typeNovels, filterNovels]);

  useEffect(() => {
    if (filterNovels === "types" && typeNovels !== "" && isLoading == true) {
      const getCount = async () => {
        const count = await getTypeCount(typeNovels, searchParams);
        setCount(count);
        setCountLoading(false);
      };
      getCount();
    }
  }, [filterNovels, typeNovels, isLoading, searchParams]);

  if (isLoading) {
    if (typeNovels === "") {
      return <NovelTypeFilterSkeleton />;
    } else {
      return (
        <>
          <SelectedNovelType
            name={typeNovels}
            count={count}
            constLoading={constLoading}
          />
          {NovelPending ? (
            <NovelsSkeleton />
          ) : (
            <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 animate-fade-in-top">
              {novels.map((novel) => getNovel(novel))}
            </div>
          )}
        </>
      );
    }
  }

  return (
    <div className="flex flex-col">
      {typeNovels === "" && types ? (
        <NovelTypeFilter
          types={types}
          setTypeNovels={(e) => setTypeNovels(e, { startTransition })}
          setCount={setCount}
        />
      ) : (
        <div className="flex flex-col gap-10">
          <SelectedNovelType name={typeNovels} count={count} />
          {NovelPending ? (
            <NovelsSkeleton />
          ) : (
            <div className="w-full flex flex-wrap gap-x-29.25 gap-y-15 animate-fade-in-top">
              {novels.map((novel) => getNovel(novel))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export { NovelTypes };
