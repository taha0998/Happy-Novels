import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { getTypes } from "@/features/chapter/queries/get-types";
import { typeFilterParser } from "../../searchParams";

type TypeWithCount = {
  id: string;
  name: string;
  _count: { linkTypeNovels: number };
};

const TypeNovelsFilter = () => {
  const [types, setTypes] = useState<TypeWithCount[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [typeNovels, setTypeNovels] = useQueryState(
    "typeNovels",
    typeFilterParser,
  );

  useEffect(() => {
    if (typeNovels === "") {
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
  }, [typeNovels]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {types.map((type) => (
        <div key={type.id}>
          {type.name}({type._count.linkTypeNovels})
        </div>
      ))}
    </>
  );
};
export { TypeNovelsFilter };
