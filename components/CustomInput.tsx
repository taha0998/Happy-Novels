import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";

const CustomInput = () => {
  return (
    <div className="w-full flex flex-1 justify-center items-center relative">
      <Input
        placeholder="Search..."
        className="w-158 text-[26px] placeholder:py-2 h-14 lg:text-[25px]
        rounded-4xl px-8 border-foreground border-2  "
      />
      <LucideSearch
        className=" absolute right-5 select-none opacity-85"
        size={38}
      />
    </div>
  );
};
export { CustomInput };
