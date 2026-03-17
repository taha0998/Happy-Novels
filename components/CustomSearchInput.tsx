import { LucideSearch } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";

type CustomSearchInputProps = {
  search: string;
  onChange: (value: string | null) => void;
};

const CustomSearchInput = ({ search, onChange }: CustomSearchInputProps) => {
  const handelChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <div className="w-full flex flex-1 justify-center items-center relative">
      <Input
        placeholder="Search..."
        className="w-143 lg:pr-15 text-[25px] placeholder:py-2 h-14 lg:text-[25px]
        rounded-4xl px-8 border-foreground border-2 font-medium"
        defaultValue={search}
        onChange={handelChange}
      />
      <LucideSearch
        className=" absolute right-5 select-none opacity-85 cursor-pointer hover:scale-90"
        size={38}
      />
    </div>
  );
};
export { CustomSearchInput };
