"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { Comment } from "@/features/comments/components/Comment";
import { NovelCommentWithMetadata } from "@/features/comments/types";
import { PaginationData } from "@/types/PaginationData";
import { getNovelComments } from "../queries/get-novel-comments";
import { NovelCreateForm } from "./forms/NovelCommentCreateForm";

export type NovelCommentsProps = {
  paginatedComments: PaginationData<NovelCommentWithMetadata>;
  novelId: string;
};

const NovelComments = ({ paginatedComments, novelId }: NovelCommentsProps) => {
  const queryKey = ["comments", novelId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getNovelComments(novelId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage?.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  const handleAddComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-30 text-[35px] mt-45 self-center w-325.75 ">
      <NovelCreateForm novelId={novelId} handleSuccess={handleAddComment} />
      <div ref={ref} className="flex flex-col gap-20 w-375 self-center mt ">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} novelId={novelId} />
        ))}
        {isFetchingNextPage && (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        )}
      </div>
      <div ref={ref}></div>
    </div>
  );
};
export { NovelComments };
