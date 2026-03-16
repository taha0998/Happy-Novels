import { Dispatch, SetStateAction } from "react";
import { CustomButton } from "@/components/CustomButton";
import { TypeWithCount } from "../NovelTyes";

type NovelTypesFilterProps = {
  types: TypeWithCount[];
  setTypeNovels: (value: string | null) => Promise<URLSearchParams>;
  setCount: Dispatch<SetStateAction<number>>;
};

const NovelTypeFilter = ({
  types,
  setTypeNovels,
  setCount,
}: NovelTypesFilterProps) => {
  const handleClick = (type: TypeWithCount) => {
    setTypeNovels(type.name);
    setCount(type._count.linkTypeNovels);
  };

  return (
    <div className="flex flex-wrap gap-10 mb-100">
      {types.map((type) => (
        <CustomButton
          key={type.id}
          variant={"outline"}
          label={`${type.name} ( ${type._count.linkTypeNovels} )`}
          padding="px-9 py-6"
          fontSize="text-[25px] font-medium"
          onClick={() => handleClick(type)}
        />
      ))}
    </div>
  );
};
export { NovelTypeFilter };
