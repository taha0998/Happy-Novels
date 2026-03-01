import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { NovelCard } from "@/features/novel/components/novelcard/NovelCard";
import { NovelChapters } from "@/features/novel/components/NovelChapters";
import { NovelChaptersLoader } from "@/features/novel/components/NovelChaptersLoader";
import { NovelRecommendation } from "@/features/novel/components/novelRecommendation/NovelRecommendation";
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
      <div className="flex flex-col justify-center items-center text-center gap-7.5 mt-15">
        <h2 className="text-primary text-[70px] font-medium">
          Recommendation:
        </h2>
        {recommendedNovels?.map((recommendedNovelId) => (
          <NovelRecommendation
            key={recommendedNovelId}
            novelId={novel.id}
            recommendedNovelId={recommendedNovelId}
            targetNovelCover={novel.coverImg}
            targetNovelTitle={novel.title}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center text-center gap-7.5 mt-15">
        <h2 className="text-primary text-[70px] font-medium">
          Recommeded <span className="text-foreground">In:</span>
        </h2>
        {recommendedInNovels?.map((recommendedInNovelId) => (
          <NovelRecommendation
            key={recommendedInNovelId}
            novelId={novel.id}
            recommendedNovelId={novel.id}
            targetNovelCover={novel.coverImg}
            targetNovelTitle={novel.title}
          />
        ))}
      </div>
    </div>
  );
};
export default NovelPage;
