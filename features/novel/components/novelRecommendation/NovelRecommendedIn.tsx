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

  const userWhoRecommend = targetNovelInfo.userWhoRecommendName;
  const content = targetNovelInfo.content;

  return (
    <div className="max-w-[85%] flex gap-15 justify-between items-center ">
      <NovelRecommendationCard recommendedNovel={targetNovel} />
      <NovelRecommendationInfo
        userWhoRecommend={userWhoRecommend}
        content={content}
      />
      <NovelRecommendationCard targetNovel={recommendedNovel} />
    </div>
  );
};
export { NovelRecommendedIn };
