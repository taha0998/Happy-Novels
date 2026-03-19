"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Reply } from "@/components/comments/Replys";
import { ChapterCommentReplyWithMetadata } from "@/components/comments/types";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { toastStyle } from "@/utils/toastStyle";
import { addChapterCommentReplyLike } from "../../actions/comment-actions/add-chapter-comment-reply-like";
import { removeChapterCommentReply } from "../../actions/comment-actions/remove-chapter-comment-reply";
import { removeChapterCommentReplyLike } from "../../actions/comment-actions/remove-chapter-comment-reply-like";
import { ChapterCommentReplyCreateForm } from "../form/ChapterCommentReplyCreateForm";

type ChapterReplyProps = {
  reply: ChapterCommentReplyWithMetadata;
  commentId: string;
  chapterId: string;
  handleSuccess: () => void;
};

const ChapterReply = ({
  reply,
  commentId,
  chapterId,
  handleSuccess,
}: ChapterReplyProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(reply.totalLikes);
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
    action: removeChapterCommentReply.bind(null, reply.id),
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
      ? addChapterCommentReplyLike(reply.id)
      : removeChapterCommentReplyLike(reply.id));

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
        <ChapterCommentReplyCreateForm
          commentId={commentId}
          replyId={reply.id}
          handleSuccess={handleSuccessReply}
          chapterId={chapterId}
          isReply={true}
        />
      }
    />
  );
};
export { ChapterReply };
