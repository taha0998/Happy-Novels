import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { NovelRecommendation } from "@/components/novel/NovelRecommendation";
import { NovelCard } from "@/features/novel/components/novelcard/NovelCard";
import { NovelChapters } from "@/features/novel/components/NovelChapters";
import { NovelChaptersLoader } from "@/features/novel/components/NovelChaptersLoader";
import { getNovel } from "@/features/novel/queries/get-novel";
import { searchParamsCache } from "@/features/novel/searchParams";

type NovelPageProps = {
  params: Promise<{
    novelId: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export const ravalidate = 30;

const NovelPage = async ({ params, searchParams }: NovelPageProps) => {
  const { novelId } = await params;
  const novel = await getNovel(novelId);

  const ParsedSearchParams = await searchParamsCache.parse(searchParams);
  const key = ParsedSearchParams.chaptersPage;

  if (!novel) {
    return;
  }
  return (
    <div className="w-440.5 self-center flex flex-col">
      <NovelCard novel={novel} />
      <Suspense key={key} fallback={<NovelChaptersLoader />}>
        <NovelChapters
          novelId={novelId}
          searchParams={searchParamsCache.parse(searchParams)}
        />
      </Suspense>
      <NovelRecommendation />
    </div>
  );
};
export default NovelPage;
