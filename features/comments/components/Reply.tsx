"use client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CommentLikeButton } from "@/components/comments/CommentLikeButton";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { addNovelCommentReplyLike } from "@/features/novel/actions/commentsActions/add-novel-comment-reply-like";
import { removeNovelCommentReply } from "@/features/novel/actions/commentsActions/remove-novel-comment-reply";
import { removeNovelCommentReplyLike } from "@/features/novel/actions/commentsActions/remove-novel-comment-reply-like";
import { NovelCommentReplyCreateForm } from "@/features/novel/components/forms/NovelCommentReplyCreateForm";
import { toastStyle } from "@/utils/toastStyle";
import { Button } from "../../../components/ui/button";
import { NovelCommentReplyWithMetadata } from "../types";

type ReplyProps = {
  reply: NovelCommentReplyWithMetadata;
  commentId: string;
  novelId: string;
  handleSuccess: () => void;
};

const Reply = ({ reply, commentId, novelId, handleSuccess }: ReplyProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const replyRef = useRef<HTMLParagraphElement>(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(reply?.totalLikes);
  const [isLiked, setIsLiked] = useState(reply.isLiked);

  const queryClient = useQueryClient();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    trigger: (
      <Button
        variant={"ghost"}
        className="text-[30px] py-7 px-2 text-[#FE5311] hover:bg-[#FE5311]"
      >
        delete
      </Button>
    ),
    action: removeNovelCommentReply.bind(null, reply.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["replys", commentId] }),
  });

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };

  const handleSuccessReply = () => {
    setShowReplyForm(false);
    handleSuccess();
  };

  const handleLikeAction = async () => {
    const next = !isLiked;

    setIsLiked(next);
    setLikes((l) => (next ? l + 1 : l - 1));

    const result = await (next
      ? addNovelCommentReplyLike(reply.id)
      : removeNovelCommentReplyLike(reply.id));

    if (result?.error === "add-without-profile") {
      toast.error("No Auth", toastStyle);
      setLikes((l) => l - 1);
      setIsLiked(false);
    } else if (result?.error === "remove-without-profile") {
      toast.error("No Auth", toastStyle);
      setLikes((l) => l + 1);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    const element = replyRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [replyRef]);

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
          className="rounded-full h-20 w-20"
        />
        <p
          className={clsx("font-medium text-[33px]", {
            "line-clamp-2": !isOpen,
            "cursor-pointer": !isOpen && isTruncated,
            "cursor-default": !isTruncated,
          })}
          ref={replyRef}
          onClick={handleOpen}
        >
          <span
            className={clsx("", {
              "text-[#FE5311]": reply.isOwner,
              "text-primary": !reply.isOwner,
            })}
          >
            @{reply?.profile.username}:{" "}
          </span>
          <span className="text-[rgb(79,128,161)]">
            {reply?.replyTo ? `@${reply.replyTo} ` : ""}
          </span>
          {reply?.content}
        </p>
      </div>
      <div>
        <div className="flex gap-0 w-full justify-end items-center">
          {reply.isOwner && (
            <>
              {deleteButton}
              {deleteDialog}
            </>
          )}

          <Button
            variant="ghost"
            className="text-[30px] py-7 px-2 text-[#385A71] hover:bg-foreground"
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
      {showReplyForm && (
        <NovelCommentReplyCreateForm
          commentId={commentId}
          replyId={reply.id}
          handleSuccess={handleSuccessReply}
          novelId={novelId}
          isReply={true}
        />
      )}
    </>
  );
};

export { Reply };
