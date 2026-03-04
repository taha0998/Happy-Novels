/* eslint-disable @next/next/no-img-element */
"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { getNovelCommentsReplys } from "@/features/novel/queries/get-novel-comments-replys";
import { PaginationData } from "@/types/PaginationData";
import { NovelCommentReplyWithMetadata } from "../types";
import { Reply } from "./Reply";

type ReplysProps = {
  paginatedReplys: PaginationData<NovelCommentReplyWithMetadata> | null;
  commentId: string;
};

const Replys = ({ commentId }: ReplysProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["replys", commentId],
      queryFn: ({ pageParam }) =>
        getNovelCommentsReplys(
          commentId,
          pageParam,
          pageParam === undefined ? 1 : 3,
        ),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const replys = data?.pages.flatMap((page) => page.list);

  if (replys?.length === 0) return null;
  if (isLoading)
    return (
      <div className="ml-27.5">
        <CommentSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col ml-27.5 gap-2 max-w-300">
      {replys?.map((reply) => (
        <Reply key={reply.id} reply={reply} />
      ))}
      {isFetchingNextPage && <CommentSkeleton />}
      {hasNextPage && (
        <img
          src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNvGv2gQl3IxdhR2k0q7WrupQnHbNFwtA8KOJ6"
          alt="dots icon"
          width={66}
          height={66}
          className="cursor-pointer relative bottom-10"
          onClick={() => {
            fetchNextPage();
          }}
        />
      )}
    </div>
  );
};

export { Replys };
