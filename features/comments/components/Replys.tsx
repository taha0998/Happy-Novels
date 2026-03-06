/* eslint-disable @next/next/no-img-element */
"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, Fragment, SetStateAction } from "react";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { NovelCommentReplyCreateForm } from "@/features/novel/components/forms/NovelCommentReplyCreateForm";
import { getNovelCommentsReplys } from "@/features/novel/queries/get-novel-comments-replys";
import { Reply } from "./Reply";

type ReplysProps = {
  commentId: string;
  showReplyForm: boolean;
  setShowReplyForm: Dispatch<SetStateAction<boolean>>;
  novelId: string;
  replyCount: number;
};

const Replys = ({
  commentId,
  showReplyForm,
  setShowReplyForm,
  novelId,
  replyCount,
}: ReplysProps) => {
  const queryKey = ["replys", commentId];
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      enabled: replyCount > 0,
      queryFn: ({ pageParam }) =>
        getNovelCommentsReplys(
          commentId,
          pageParam,
          pageParam === undefined ? 2 : 3,
        ),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const replys = data?.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();
  const handleAddReply = () => queryClient.invalidateQueries({ queryKey });

  const updateReplyCount = () =>
    queryClient.invalidateQueries({ queryKey: ["comments", novelId] });

  const handleSuccess = () => {
    handleAddReply();
    setShowReplyForm(false);
    updateReplyCount();
  };

  if (isLoading)
    return (
      <div className="ml-27.5">
        <CommentSkeleton />
      </div>
    );

  return (
    <>
      {showReplyForm && (
        <div className="mb-10">
          <NovelCommentReplyCreateForm
            commentId={commentId}
            handleSuccess={handleSuccess}
            novelId={novelId}
          />
        </div>
      )}
      {isLoading && replyCount > 0 ? (
        <div className="ml-27.5">
          <CommentSkeleton />
        </div>
      ) : (
        <div className="flex flex-col ml-27.5 gap-2 max-w-300">
          {replys?.map((reply) => (
            <Fragment key={reply.id}>
              <Reply
                key={reply.id}
                reply={reply}
                commentId={commentId}
                novelId={novelId}
                handleSuccess={handleSuccess}
              />
            </Fragment>
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
      )}
    </>
  );
};

export { Replys };
