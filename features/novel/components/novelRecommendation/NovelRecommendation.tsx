import { NovelRecommendationCard } from "@/features/novel/components/novelRecommendation/NovelRecommendationCard";
import { getRecommendedNovel } from "@/features/novel/queries/getRecommendedNovel";
import { NovelRecommendationInfo } from "./NovelRecommendationInfo";

type NovelRecommendationProps = {
  novelId: string;
  recommendedNovelId: string;
  targetNovelCover: string;
  targetNovelTitle: string;
};

const NovelRecommendation = async ({
  novelId,
  recommendedNovelId,
  targetNovelCover,
  targetNovelTitle,
}: NovelRecommendationProps) => {
  const [recommendedNovel, recommendedNovelInfo] = await getRecommendedNovel(
    novelId,
    recommendedNovelId,
  );

  const targetNovel = {
    id: novelId,
    coverImg: targetNovelCover,
    title: targetNovelTitle,
  };

  const userWhoRecommend = recommendedNovelInfo?.userWhoRecommendName;

  if (!recommendedNovel || !userWhoRecommend) {
    return null;
  }

  return (
    <div className="max-w-[85%] flex gap-15 justify-between items-center ">
      <NovelRecommendationCard targetNovel={targetNovel} />
      <NovelRecommendationInfo userWhoRecommend={userWhoRecommend} />
      <NovelRecommendationCard recommendedNovel={recommendedNovel} />
    </div>
  );
};
export { NovelRecommendation };
