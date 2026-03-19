import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { addChapterView } from "@/features/chapter/actions/add-chapter-view";
import { ChapterComments } from "@/features/chapter/components/comments/ChapterComments";
import { getChapter } from "@/features/chapter/queries/get-chapter";
import { Chapter } from "../components/Chapter";
import { NextPrevGroup } from "../components/NextPrevGroup";

type ChapterPageProps = {
  params: Promise<{
    chapterId: string;
  }>;
};

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapterId } = await params;
  const chapter = await getChapter(chapterId);

  if (!chapter) {
    return notFound();
  }
  await addChapterView(chapterId, chapter.novelId);

  return (
    <div className="w-440.5 self-center flex flex-col">
      <Chapter
        novelName={chapter.novel.title}
        number={chapter.number}
        title={chapter.title}
        content={chapter.content}
      />
      <NextPrevGroup number={chapter.number} novelId={chapter.novelId} />
      <Suspense fallback={<CommentSkeleton />}>
        <ChapterComments chapterId={chapterId} />
      </Suspense>
    </div>
  );
};
export default ChapterPage;
