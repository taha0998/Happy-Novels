import { getRecommendedInNovel } from "../../queries/getRecommendedInNovel";
import { NovelRecommendationCard } from "./NovelRecommendationCard";
import { NovelRecommendationInfo } from "./NovelRecommendationInfo";

type NovelRecommendedInProps = {
  targetNovelId: string;
  recommendedNovelId: string;
  recommendedNovelCover: string;
  recommendedNovelTitle: string;
};

const NovelRecommendedIn = async ({
  targetNovelId,
  recommendedNovelId,
  recommendedNovelCover,
  recommendedNovelTitle,
}: NovelRecommendedInProps) => {
  const [targetNovel, targetNovelInfo] = await getRecommendedInNovel(
    targetNovelId,
    recommendedNovelId,
  );
  if (!targetNovel || !targetNovelInfo) {
    return null;
  }
  const recommendedNovel = {
    id: recommendedNovelId,
    title: recommendedNovelTitle,
    coverImg: recommendedNovelCover,
  };

  return (
    <div className="max-w-[85%] flex gap-15 justify-between items-center ">
      <NovelRecommendationCard recommendedNovel={targetNovel} />
      <NovelRecommendationInfo
        userWhoRecommend={targetNovelInfo?.userWhoRecommendName}
      />
      <NovelRecommendationCard targetNovel={recommendedNovel} />
    </div>
  );
};
export { NovelRecommendedIn };
