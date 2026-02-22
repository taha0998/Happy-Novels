import Link from "next/link";
import { ChapterButton } from "@/components/buttons/ChapterButton";
import { HomePath } from "@/lib/paths";

type ChaptersProps = {
  id: string;
  number: number;
};

type NovelChaptersProps = {
  chapters: ChaptersProps[];
};

const NovelChapters = ({ chapters }: NovelChaptersProps) => {
  return (
    <div className="flex flex-wrap gap-7.5 mt-15">
      {chapters.map((chapter) => (
        <Link href={HomePath()} prefetch={false} key={chapter.id}>
          <ChapterButton number={chapter.number} />
        </Link>
      ))}
    </div>
  );
};

export { NovelChapters };
