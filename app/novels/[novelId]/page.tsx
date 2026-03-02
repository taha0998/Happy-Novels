import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { NovelComments } from "@/features/comments/components/NovelComments";
import { NovelCard } from "@/features/novel/components/novelcard/NovelCard";
import { NovelChapters } from "@/features/novel/components/NovelChapters";
import { NovelChaptersLoader } from "@/features/novel/components/NovelChaptersLoader";
import { NovelRecommendations } from "@/features/novel/components/novelRecommendation/NovelRecommendations";
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
  const recommendedNovels = novel?.recommendations.flatMap(
    (r) => r.recommendedNovelId,
  );

  const recommendedInNovels = novel?.recommendedIn.flatMap(
    (r) => r.targetNovelId,
  );

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

      {recommendedNovels && recommendedNovels.length > 0 && (
        <NovelRecommendations
          novelsIds={recommendedNovels}
          novel={novel}
          target={true}
        />
      )}
      {recommendedInNovels && recommendedInNovels.length > 0 && (
        <NovelRecommendations
          novelsIds={recommendedInNovels}
          novel={novel}
          target={false}
        />
      )}
      <NovelComments />
    </div>
  );
};
export default NovelPage;
