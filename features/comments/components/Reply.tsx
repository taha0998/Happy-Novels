"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";

type ReplyProps = {
  content: string;
};

const Reply = ({ content }: ReplyProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const replyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = replyRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [replyRef]);

  const handleOpen = () => {
    setOpen((state) => !state);
  };
  return (
    <>
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
          className={clsx("font-medium", {
            "line-clamp-2": !isOpen,
            "cursor-pointer": !isOpen && isTruncated,
            "cursor-default": !isTruncated,
          })}
          ref={replyRef}
          onClick={handleOpen}
        >
          <span className="text-secondary-foreground">@Rr599: </span>
          {content}
        </p>
      </div>
      <div>
        <div className="flex gap-0 w-full justify-end items-center">
          <Button
            variant="ghost"
            className="text-[35px] py-7 text-[#385A71] hover:bg-foreground"
          >
            reply
          </Button>
          <Button variant="ghost" className="text-[35px] py-7 text-primary">
            like
          </Button>
        </div>
        {/* <img
          src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNvGv2gQl3IxdhR2k0q7WrupQnHbNFwtA8KOJ6"
          alt="dots icon"
          width={66}
          height={66}
          className="cursor-pointer relative bottom-10"
        /> */}
      </div>
    </>
  );
};

export { Reply };
