"use client";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getNovelCommentsReplys } from "@/features/novel/queries/get-novel-comments-replys";
import { PaginationData } from "@/types/PaginationData";
import { Button } from "../../../components/ui/button";
import {
  NovelCommentReplyWithMetadata,
  NovelCommentWithMetadata,
} from "../types";
import { Replys } from "./Replys";

type CommentProps = {
  comment: NovelCommentWithMetadata;
};

const Comment = ({ comment }: CommentProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);
  const [paginatedReplys, setReplys] =
    useState<PaginationData<NovelCommentReplyWithMetadata> | null>(null);

  useEffect(() => {
    const element = commentRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [commentRef]);

  useEffect(() => {
    const getReplys = async () => {
      const replys = await getNovelCommentsReplys(comment.id);
      if (replys) {
        setReplys(replys);
      }
    };
    getReplys();
  }, [comment]);

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
            <span className="text-primary">@{comment.profile.username}: </span>
            {comment.content}
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
        </div>
        <Replys paginatedReplys={paginatedReplys} commentId={comment.id} />
      </div>
    </>
  );
};
export { Comment };
