"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Replys } from "./Replys";

type CommentProps = {
  content: string;
};

const Comment = ({ content }: CommentProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = commentRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [commentRef]);

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-7.5">
          <Image
            src={
              "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNQ3FvZVz23lJavfGrjHKOopMWFsBzgkI1d5Dy"
            }
            alt="user logo"
            width={80}
            height={80}
            className="rounded-full max-h-20"
          />
          <p
            ref={commentRef}
            className={clsx("font-medium break-all", {
              "line-clamp-3": !isOpen,
              "cursor-pointer": !isOpen && isTruncated,
              "cursor-default": !isTruncated,
            })}
            onClick={handleOpen}
          >
            <span className="text-primary">@Dr567: </span>
            {content}
          </p>
        </div>
        <div>
          <div className="flex gap-0 w-full justify-end items-center">
            <Button
              variant="ghost"
              className="text-[35px] py-7 text-secondary-foreground hover:bg-foreground"
            >
              reply
            </Button>
            <Button variant="ghost" className="text-[35px] py-7 text-primary">
              like
            </Button>
          </div>
          <Replys />
        </div>
      </div>
    </>
  );
};
export { Comment };
