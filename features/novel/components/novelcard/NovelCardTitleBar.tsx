import { fixedRatingCount } from "../../utils/fixedRatingCount";

type NovelCardTitleBarProps = {
  title: string;
  rating: number;
  ratingCount: number;
};

const NovelCardTitleBar = ({
  title,
  rating,
  ratingCount,
}: NovelCardTitleBarProps) => {
  return (
    <div className="flex gap-8 w-full justify-between items-start">
      <h1 className="text-[100px] font-semibold line-clamp-3 wrap-break-word">
        {title}
      </h1>
      <div className="flex flex-col items-center relative">
        <h2 className="text-[80px] font-semibold">
          <span className="text-primary">{rating}</span>/100
        </h2>
        <h2 className="text-[80px] font-semibold relative bottom-8 select-none">
          ({fixedRatingCount(ratingCount)})
        </h2>
      </div>
    </div>
  );
};

export { NovelCardTitleBar };
