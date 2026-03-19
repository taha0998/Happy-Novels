"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { CreateForm } from "@/features/novel/components/forms/CommentCreateForm";
import { addChapterCommentLike } from "../../actions/comment-actions/add-chapter-comment-like";
import { createChapterComment } from "../../actions/comment-actions/create-chapter-comment";
import { removeChapterComment } from "../../actions/comment-actions/remove-chapter-comment";
import { removeChapterCommentLike } from "../../actions/comment-actions/remove-chapter-comment-like";
import { getChapterComments } from "../../queries/get-chapter-comments";
import { ChapterComment } from "./ChapterComment";

type ChapterCommentsProps = {
  chapterId: string;
};

const ChapterComments = ({ chapterId }: ChapterCommentsProps) => {
  const queryKey = ["comments", chapterId];
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getChapterComments(chapterId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data?.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  const handelAddComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;

    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="flex flex-col gap-30 text-[35px] mt-45 self-center w-325.75 ">
        <CreateForm
          action={createChapterComment.bind(null, chapterId)}
          handleSuccess={handelAddComment}
        />
        {isLoading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : (
          <div className="flex flex-col gap-15 w-326 self-center mt ">
            {comments?.map((comment) => (
              <ChapterComment
                key={comment.id}
                comment={comment}
                chapterId={chapterId}
                removeCommentAction={removeChapterComment}
                addCommentLike={addChapterCommentLike}
                removeCommentLike={removeChapterCommentLike}
              />
            ))}
            {isFetchingNextPage && (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            )}
          </div>
        )}
        {hasNextPage && <div className="pb-50"></div>}
        <div ref={ref} className="h-10"></div>
      </div>
    </>
  );
};

export { ChapterComments };
