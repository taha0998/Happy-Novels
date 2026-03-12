"use client";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommentLikeButton } from "./CommentLikeButton";

type CommentProps = {
  isOwner: boolean;
  username: string;
  content: string;
  confirmDelete: React.ReactElement;
  deleteButton: React.ReactElement;
  likes: number;
  isLiked: boolean;
  handleLikeAction: () => Promise<void>;
  setShowReplyForm: Dispatch<SetStateAction<boolean>>;
};

const Comment = ({
  isOwner,
  username,
  content,
  confirmDelete,
  deleteButton,
  likes,
  isLiked,
  handleLikeAction,
  setShowReplyForm,
}: CommentProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };

  useEffect(() => {
    const element = commentRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [commentRef]);

  return (
    <>
      <div className="flex flex-col gap-0 mb-7">
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
              "line-clamp-3 ": !isOpen,
              "cursor-pointer ": !isOpen && isTruncated,
              "cursor-default": !isTruncated,
            })}
            onClick={handleOpen}
          >
            <span
              className={clsx("", {
                "text-[#FE5311]": isOwner,
                "text-primary": !isOwner,
              })}
            >
              @{username}:{" "}
            </span>
            {content}
          </p>
        </div>
        <div>
          <div className="flex gap-0 w-full justify-end items-center">
            {isOwner && (
              <>
                {confirmDelete}
                {deleteButton}
              </>
            )}
            <Button
              variant="ghost"
              className="text-[30px] py-7 px-2 text-secondary-foreground hover:bg-foreground"
              onClick={() => setShowReplyForm((state) => !state)}
            >
              reply
            </Button>
            <CommentLikeButton
              likes={likes}
              isLiked={isLiked}
              onClick={handleLikeAction}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export { Comment };
