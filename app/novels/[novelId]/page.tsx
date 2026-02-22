import { NovelCard } from "@/features/novel/components/novelcard/NovelCard";
import { NovelChapters } from "@/features/novel/components/NovelChapters";
import { getChapters } from "@/features/novel/queries/get-chapters";
import { getNovel } from "@/features/novel/queries/get-novel";

type NovelPageProps = {
  params: Promise<{
    novelId: string;
  }>;
};
const NovelPage = async ({ params }: NovelPageProps) => {
  const { novelId } = await params;
  const novelPromise = getNovel(novelId);
  const chaptersPromise = getChapters(novelId);

  const [novel, chapters] = await Promise.all([novelPromise, chaptersPromise]);

  if (!novel) {
    return;
  }
  return (
    <div className="w-440.5 self-center ">
      <NovelCard novel={novel} />
      <NovelChapters chapters={chapters.list} />
    </div>
  );
};
export default NovelPage;
