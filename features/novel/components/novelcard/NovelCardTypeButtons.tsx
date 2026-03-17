import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypePath } from "@/lib/paths";

type Type = {
  id: string;
  name: string;
};

type NovelCardTypeButtonsProps = {
  types: Type[];
};

export const revalidate = 10;

const NovelCardTypeButtons = ({ types }: NovelCardTypeButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-5 max-w-[730.13px]">
      {types.map((type) => (
        <Button
          key={type.id}
          size="none"
          variant="default"
          className="text-[27px] self-center cursor-pointer px-3.75 py-1.75"
          asChild
        >
          <Link href={TypePath(type.name)} prefetch={false}>
            {type.name}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export { NovelCardTypeButtons };
