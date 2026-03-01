import { LucideShuffle } from "lucide-react";

type NovelRecommendationInfoProps = {
  userWhoRecommend: string;
};

const NovelRecommendationInfo = ({
  userWhoRecommend,
}: NovelRecommendationInfoProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-medium">
      <h3 className="text-[32px]">
        <span className="text-primary">@{userWhoRecommend}</span> says:
      </h3>
      <p className=" line-clamp-7 text-[27px]">
        {`Going against the heavens, Tuoba Ye reincarnated. Body concealing
          Divine Root, hands holding Divine Talisman, possessing previous life's
          experiences, from childhood, began cultivating the most difficult body
          refining method: Mythical Nine Transformations Descz`}
      </p>
      <LucideShuffle className="text-foreground size-18" />
    </div>
  );
};

export { NovelRecommendationInfo };
