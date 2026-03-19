"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Reply } from "@/components/comments/Replys";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { addNovelCommentReplyLike } from "@/features/novel/actions/comments-actions/add-novel-comment-reply-like";
import { removeNovelCommentReply } from "@/features/novel/actions/comments-actions/remove-novel-comment-reply";
import { removeNovelCommentReplyLike } from "@/features/novel/actions/comments-actions/remove-novel-comment-reply-like";
import { NovelCommentReplyCreateForm } from "@/features/novel/components/forms/NovelCommentReplyCreateForm";
import { toastStyle } from "@/utils/toastStyle";
import { NovelCommentReplyWithMetadata } from "../../../../components/comments/types";
import { Button } from "../../../../components/ui/button";

type ReplyProps = {
  reply: NovelCommentReplyWithMetadata;
  commentId: string;
  novelId: string;
  handleSuccess: () => void;
};

const NovelReply = ({
  reply,
  commentId,
  novelId,
  handleSuccess,
}: ReplyProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(reply.totalLikes);
  const [isLiked, setIsLiked] = useState(reply.isLiked);

  const queryClient = useQueryClient();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    trigger: (
      <Button
        variant={"ghost"}
        className="text-[24.8px] py-7 px-2 text-[#FE5311] hover:bg-[#FE5311]"
      >
        delete
      </Button>
    ),
    action: removeNovelCommentReply.bind(null, reply.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["replys", commentId] }),
  });

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

  return (
    <Reply
      isOwner={reply.isOwner}
      username={reply.profile.username}
      replyTo={reply.replyTo}
      content={reply.content}
      deleteButton={deleteButton}
      deleteDialog={deleteDialog}
      setShowReplyForm={setShowReplyForm}
      likes={likes}
      isLiked={isLiked}
      handleLikeAction={handleLikeAction}
      showReplyForm={showReplyForm}
      replyForm={
        <NovelCommentReplyCreateForm
          commentId={commentId}
          replyId={reply.id}
          handleSuccess={handleSuccessReply}
          novelId={novelId}
          isReply={true}
        />
      }
    />
  );
};

export { NovelReply };
