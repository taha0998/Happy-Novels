import Image from "next/image";
import Link from "next/link";
import { NovelPath } from "@/lib/paths";

type RecommmedNovel = {
  id: string;
  title: string | undefined;
  coverImg: string | undefined;
};

type NovelRecommendationCardProps = {
  recommendedNovel?: RecommmedNovel;
  targetNovel?: RecommmedNovel;
};

const NovelRecommendationCard = ({
  recommendedNovel,
  targetNovel,
}: NovelRecommendationCardProps) => {
  return (
    <>
      {recommendedNovel ? (
        <Link href={NovelPath(recommendedNovel.id)} className="shrink-0">
          <Image
            src={recommendedNovel?.coverImg ?? ""}
            alt={`${recommendedNovel?.title} Cover`}
            width={381}
            height={546.73}
            className=" rounded-[8.9px] border-primary border-5"
          />
        </Link>
      ) : null}
      {targetNovel ? (
        <Image
          src={targetNovel?.coverImg ?? ""}
          alt={`${targetNovel?.title} Cover`}
          width={381}
          height={546.73}
          className=" rounded-[8.9px] border-primary border-5"
        />
      ) : null}
    </>
  );
};

export { NovelRecommendationCard };
