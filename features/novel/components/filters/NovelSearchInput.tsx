import { Options } from "nuqs";
import { TransitionStartFunction } from "react";
import { CustomSearchInput } from "@/components/CustomSearchInput";

type NovelSearchInputProps = {
  search: string;
  setSearch: (value: string | null, options?: Options) => void;
  startTransition: TransitionStartFunction;
};

const NovelSearchInput = ({
  search,
  setSearch,
  startTransition,
}: NovelSearchInputProps) => {
  return (
    <div className="flex justify-center items-center">
      <CustomSearchInput
        search={search}
        onChange={(value) => startTransition(() => setSearch(value))}
      />
    </div>
  );
};
export { NovelSearchInput };
