import { LucideShuffle } from "lucide-react";

type NovelRecommendationInfoProps = {
  userWhoRecommend: string;
  content: string;
};

const NovelRecommendationInfo = ({
  userWhoRecommend,
  content,
}: NovelRecommendationInfoProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center font-medium">
      <h3 className="text-[32px]">
        <span className="text-primary">@{userWhoRecommend}</span> says:
      </h3>
      <p className=" line-clamp-7 text-[27px]">{content}</p>
      <LucideShuffle className="text-foreground size-18" />
    </div>
  );
};

export { NovelRecommendationInfo };
