import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { NovelTypeFilterSkeleton } from "@/components/skeletons/NovelTypesFilterSkeleton";
import { getTypes } from "@/features/chapter/queries/get-types";
import { filterNovelsParser, typeFilterParser } from "../searchParams";
import { NovelTypeFilter } from "./filters/NovelTypeFilter";
import { SelectedNovelType } from "./filters/SelectedNovelType";

export type TypeWithCount = {
  id: string;
  name: string;
  _count: { linkTypeNovels: number };
};

const NovelTypes = () => {
  const [types, setTypes] = useState<TypeWithCount[]>([]);
  const [count, setCount] = useState(0);

  const [isLoading, setLoading] = useState(true);
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
        }
      };
      fetchTypes();
    }
  }, [typeNovels, filterNovels]);

  if (isLoading) {
    return <NovelTypeFilterSkeleton />;
  }

  return (
    <div className="flex flex-col">
      {typeNovels === "" ? (
        <NovelTypeFilter
          types={types}
          setTypeNovels={setTypeNovels}
          setCount={setCount}
        />
      ) : (
        <div>
          <SelectedNovelType name={typeNovels} count={count} />
        </div>
      )}
    </div>
  );
};
export { NovelTypes };
