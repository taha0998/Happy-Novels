import Image from "next/image";
import Link from "next/link";
import { novelPath } from "@/lib/paths";

type NovelItemProps = {
  id: string;
  title: string;
  coverImg: string;
  rating: number;
  ratingCount: number;
};

const NovelItem = ({
  id,
  title,
  coverImg,
  rating,
  ratingCount,
}: NovelItemProps) => {
  const fixedRatingCount = (ratingCount: number | null | undefined) => {
    if (!ratingCount) return "??";
    if (ratingCount < 1000) {
      return ratingCount;
    }
    const fixedRatingCount = (ratingCount / 1000).toFixed(1);
    return `${fixedRatingCount}K`;
  };

  return (
    <div className="flex flex-col w-86.25">
      <Link href={novelPath(id)}>
        <Image
          src={coverImg}
          alt="Novel {Title}"
          width={344.76}
          height={494.73}
          className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
          loading="lazy"
        />
        <div className="flex flex-col mt-3 gap-2">
          <p className="text-[26px] font-medium line-clamp-2 ">{title}</p>
          <p className="text-[26px] font-medium">
            ratings: <span className="text-primary">{rating}</span>/100 (
            {fixedRatingCount(ratingCount)})
          </p>
        </div>
      </Link>
    </div>
  );
};

export { NovelItem };
