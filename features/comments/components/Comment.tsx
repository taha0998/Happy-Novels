"use client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CommentLikeButton } from "@/components/comments/CommentLikeButton";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { isOwner } from "@/features/auth/actions/is-owner";
import { useProfile } from "@/features/auth/queries/useProfile";
import { addNovelCommentLike } from "@/features/novel/actions/commentsActions/add-novel-comment-like";
import { removeNovelComment } from "@/features/novel/actions/commentsActions/remove-novel-comment";
import { removeNovelCommentLike } from "@/features/novel/actions/commentsActions/remove-novel-comment-like";
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
  const [likes, setLikes] = useState(comment.totalLikes);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [profile] = useProfile();

  const queryClient = useQueryClient();

  const [deleteButton, confirmDelete] = useConfirmDialog({
    trigger: (
      <Button
        variant={"ghost"}
        className="text-[35px] py-7 text-[#FE5311] hover:bg-[#FE5311]"
      >
        delete
      </Button>
    ),
    action: removeNovelComment.bind(null, comment.id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments", novelId],
      }),
  });

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };
  const handelLike = () => {
    if (isLiked) {
      setLikes((state) => state - 1);
    } else {
      setLikes((state) => state + 1);
    }
    setIsLiked((state) => !state);
  };

  const handleLikeAction = async () => {
    await (comment.isLiked
      ? removeNovelCommentLike(comment.id)
      : addNovelCommentLike(comment.id));
  };

  useEffect(() => {
    const element = commentRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [commentRef]);
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
            {isOwner(profile, comment) && (
              <>
                {confirmDelete}
                {deleteButton}
              </>
            )}
            <Button
              variant="ghost"
              className="text-[35px] py-7 text-secondary-foreground hover:bg-foreground"
              onClick={() => setShowReplyForm((state) => !state)}
            >
              reply
            </Button>
            <form action={handleLikeAction}>
              <CommentLikeButton
                likes={likes}
                isLiked={isLiked}
                onClick={handelLike}
              />
            </form>
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
