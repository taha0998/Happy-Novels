"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ActionState } from "@/components/form/utils/to-action-state";
import { useConfirmDialog } from "@/components/useConfirmDialog";
import { Comment } from "@/features/comments/components/Comment";
import { toastStyle } from "@/utils/toastStyle";
import { Button } from "../../../components/ui/button";
import { Replys } from "../../comments/components/Replys";
import { NovelCommentWithMetadata } from "../../comments/types";

type NovelCommentProps = {
  comment: NovelCommentWithMetadata;
  novelId: string;
  removeCommentAction: (commentId: string) => Promise<ActionState>;
  addCommentLike: (
    commentId: string,
  ) => Promise<{ error?: string } | undefined | void>;
  removeCommentLike: (
    commentId: string,
  ) => Promise<{ error: string } | null | undefined>;
};

const NovelComment = ({
  comment,
  novelId,
  removeCommentAction,
  addCommentLike,
  removeCommentLike,
}: NovelCommentProps) => {
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
        queryKey: ["comments", novelId],
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
export { NovelComment };
