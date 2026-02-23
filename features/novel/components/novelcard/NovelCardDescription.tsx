"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type NovelCardDescriptionProps = {
  description: string;
};

const NovelCardDescription = ({ description }: NovelCardDescriptionProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = descriptionRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };

  return (
    <p
      className={clsx("w-252.75 text-[36px]/[50px] font-medium", {
        "line-clamp-7": !isOpen,
        "cursor-pointer": !isOpen && isTruncated,
        "cursor-default": !isTruncated,
      })}
      onClick={handleOpen}
      ref={descriptionRef}
    >
      {description}
    </p>
  );
};

export { NovelCardDescription };
