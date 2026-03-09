"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { Comment } from "@/features/comments/components/Comment";
import { getNovelComments } from "../queries/get-novel-comments";
import { NovelCreateForm } from "./forms/NovelCommentCreateForm";

export type NovelCommentsProps = {
  novelId: string;
};

const NovelComments = ({ novelId }: NovelCommentsProps) => {
  const queryKey = ["comments", novelId];
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getNovelComments(novelId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data?.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  const handleAddComment = () => queryClient.invalidateQueries({ queryKey });

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
        <NovelCreateForm novelId={novelId} handleSuccess={handleAddComment} />
        {isLoading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : (
          <div className="flex flex-col gap-20 w-375 self-center mt ">
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} novelId={novelId} />
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
export { NovelComments };
