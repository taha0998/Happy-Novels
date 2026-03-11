"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ActionState } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { Comment } from "@/features/comments/components/Comment";
import { ChapterCommentWithMetadata } from "@/features/comments/types";
import { toastStyle } from "@/utils/toastStyle";

type ChapterCommentProps = {
  comment: ChapterCommentWithMetadata;
  chapterId: string;
  removeCommentAction: (commentId: string) => Promise<ActionState>;
  addCommentLike: (
    commentId: string,
  ) => Promise<{ error?: string } | undefined | void>;
  removeCommentLike: (
    commentId: string,
  ) => Promise<{ error: string } | null | undefined>;
};

const ChapterComment = ({
  comment,
  chapterId,
  removeCommentAction,
  addCommentLike,
  removeCommentLike,
}: ChapterCommentProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(comment.totalLikes);
  const [isLiked, setIsLiked] = useState(comment.isLiked);

  const queryClient = useQueryClient();

  const [deleteButton, confirmDelete] = useConfirmDialog({
    trigger: (
      <Button
        variant={"ghost"}
        className="text-[30px] py-7 px-2 text-[#FE5311] hover:bg-[#FE5311]"
      >
        delete
      </Button>
    ),
    action: removeCommentAction.bind(null, comment.id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["comments", chapterId],
      }),
  });

  const handleLikeAction = async () => {
    const next = !isLiked;

    setIsLiked(next);
    setLikes((l) => (next ? l + 1 : l - 1));

    const result = await (next
      ? addCommentLike(comment.id)
      : removeCommentLike(comment.id));

    if (result?.error === "add-without-profile") {
      toast.error("No Auth", toastStyle);
      setLikes((l) => l - 1);
      setIsLiked(false);
    } else if (result?.error === "remove-without-profile") {
      toast.error("No Auth", toastStyle);
      setLikes((l) => l + 1);
      setIsLiked(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-0 mb-7">
        <Comment
          isOwner={comment.isOwner}
          username={comment.profile.username}
          content={comment.content}
          confirmDelete={confirmDelete}
          deleteButton={deleteButton}
          likes={likes}
          isLiked={isLiked}
          handleLikeAction={handleLikeAction}
          setShowReplyForm={setShowReplyForm}
        />
        {/* Replys */}
      </div>
    </>
  );
};

export { ChapterComment };
