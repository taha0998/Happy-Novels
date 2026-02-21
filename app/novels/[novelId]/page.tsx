import { NovelCard } from "@/features/novel/components/novelcard/NovelCard";
import { getNovel } from "@/features/novel/queries/get-novel";

type NovelPageProps = {
  params: Promise<{
    novelId: string;
  }>;
};
const NovelPage = async ({ params }: NovelPageProps) => {
  const { novelId } = await params;
  const novel = await getNovel(novelId);

  if (!novel) {
    return;
  }
  return (
    <div className="w-440.5 self-center ">
      <NovelCard novel={novel} />
    </div>
  );
};
export default NovelPage;
