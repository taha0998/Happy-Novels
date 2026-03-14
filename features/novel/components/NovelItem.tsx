import Image from "next/image";
import Link from "next/link";
import { NovelPath } from "@/lib/paths";
import { fixedRatingCount } from "../utils/fixedRatingCount";

type NovelItemProps = {
  id: string;
  title: string;
  coverImg: string;
  rating: number;
  ratingCount: number;
  lastChapter?: number;
  totalViews: number;
};

const NovelItem = ({
  id,
  title,
  coverImg,
  rating,
  ratingCount,
  lastChapter,
  totalViews,
}: NovelItemProps) => {
  return (
    <div className="flex flex-col w-86.25">
      <Link href={NovelPath(id)} prefetch={false}>
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
          <p className="text-[31.25px] font-medium line-clamp-2 ">{title}</p>
          <p className="text-[25px] font-medium">
            ratings: <span className="text-[#FE5311]">{rating}</span>
            /100 ({fixedRatingCount(ratingCount)})
          </p>
          <p className="text-[25px] font-medium">
            last chapter:{" "}
            {lastChapter ? (
              <span className="text-primary">{lastChapter}</span>
            ) : (
              <span className="text-primary">??</span>
            )}
          </p>
          <p className="text-[25px] font-medium">
            total views: <span className="text-primary">{totalViews}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export { NovelItem };
