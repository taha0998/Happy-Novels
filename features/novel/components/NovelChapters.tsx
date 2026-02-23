import Link from "next/link";
import { ChapterButton } from "@/components/buttons/ChapterButton";
import { ChapterPath } from "@/lib/paths";
import { getChapters } from "../queries/get-chapters";
import { ParsedSearchParams } from "../searchParams";
import { NovelChapterPagination } from "./NovelChaptersPagination";

type NovelChaptersProps = {
  novelId: string;
  searchParams: ParsedSearchParams;
};

const NovelChapters = async ({ novelId, searchParams }: NovelChaptersProps) => {
  const { list: chapters, metadata: chaptersMetadata } = await getChapters(
    novelId,
    searchParams,
  );
  return (
    <>
      <div className="flex flex-wrap gap-7.5 mt-15">
        {chapters.map((chapter) => (
          <Link
            href={ChapterPath(chapter.id)}
            prefetch={false}
            key={chapter.id}
          >
            <ChapterButton number={chapter.number} />
          </Link>
        ))}
      </div>
      {chaptersMetadata.count > 50 && (
        <NovelChapterPagination count={chaptersMetadata.count} />
      )}
    </>
  );
};

export { NovelChapters };
