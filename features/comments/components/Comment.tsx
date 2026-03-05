"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { NovelCommentWithMetadata } from "../types";
import { Replys } from "./Replys";

type CommentProps = {
  comment: NovelCommentWithMetadata;
  novelId: string;
};

const Comment = ({ comment, novelId }: CommentProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);

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
            className="rounded-full h-20 w-20"
          />
          <p
            ref={commentRef}
            className={clsx("font-medium", {
              "line-clamp-3": !isOpen,
              "cursor-pointer": !isOpen && isTruncated,
              "cursor-default": !isTruncated,
            })}
            onClick={handleOpen}
          >
            <span className="text-primary">
              @{comment.profile.username ?? "haha"}:{" "}
            </span>
            {comment.content}
          </p>
        </div>
        <div>
          <div className="flex gap-0 w-full justify-end items-center">
            <Button
              variant="ghost"
              className="text-[35px] py-7 text-secondary-foreground hover:bg-foreground"
              onClick={() => setShowReplyForm((state) => !state)}
            >
              reply
            </Button>
            <Button variant="ghost" className="text-[35px] py-7 text-primary">
              like
            </Button>
          </div>
        </div>
        <Replys
          commentId={comment.id}
          showReplyForm={showReplyForm}
          setShowReplyForm={setShowReplyForm}
          novelId={novelId}
          replyCount={comment.novelCommentReplys.length}
        />
      </div>
    </>
  );
};
export { Comment };
