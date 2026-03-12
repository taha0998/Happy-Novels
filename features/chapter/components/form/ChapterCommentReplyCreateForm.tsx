"use client";

import { useActionState } from "react";
import { CommentReplyCreateForm } from "@/components/comments/form/CommentReplyCreateForm";
import { EPMTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { createChapterReplyComment } from "../../actions/comment-actions/create-chapter-reply-comment";

type ChapterCommentReplyCreateFormProps = {
  commentId: string;
  handleSuccess: () => void;
  chapterId: string;
  isReply?: boolean;
  replyId?: string;
};

const ChapterCommentReplyCreateForm = ({
  commentId,
  handleSuccess,
  chapterId,
  isReply = false,
  replyId,
}: ChapterCommentReplyCreateFormProps) => {
  const [actionState, action] = useActionState(
    createChapterReplyComment.bind(
      null,
      commentId,
      chapterId,
      isReply,
      replyId,
    ),
    EPMTY_ACTION_STATE,
  );

  return (
    <CommentReplyCreateForm
      actionState={actionState}
      action={action}
      handleSuccess={handleSuccess}
    />
  );
};

export { ChapterCommentReplyCreateForm };
