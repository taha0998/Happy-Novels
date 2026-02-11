import { LucideSearch } from "lucide-react";
import { Input } from "@/components/ui/input";

const CustomSearchInput = () => {
  return (
    <div className="w-full flex flex-1 justify-center items-center relative">
      <Input
        placeholder="Search..."
        className="w-158 text-[25px] placeholder:py-2 h-14 lg:text-[25px]
        rounded-4xl px-8 border-foreground border-2 font-medium "
      />
      <LucideSearch
        className=" absolute right-5 select-none opacity-85"
        size={38}
      />
    </div>
  );
};
export { CustomSearchInput };
