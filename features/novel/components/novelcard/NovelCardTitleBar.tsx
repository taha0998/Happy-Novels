"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = titleRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [title]);

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };

  return (
    <div className="flex gap-8 w-full justify-between items-center">
      <h1
        className={clsx("text-[100px] font-semibold wrap-break-word", {
          "line-clamp-3": !isOpen,
          "cursor-pointer": !isOpen && isTruncated,
          "cursor-default": !isTruncated,
        })}
        ref={titleRef}
        onClick={handleOpen}
      >
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
