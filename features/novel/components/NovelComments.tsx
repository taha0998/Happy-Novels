"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentSkeleton } from "@/components/comments/CommentSkeleton";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/features/comments/components/Comment";
import { NovelCommentWithMetadata } from "@/features/comments/types";
import { PaginationData } from "@/types/PaginationData";
import { getNovelComments } from "../queries/get-novel-comments";

export type NovelCommentsProps = {
  paginatedComments: PaginationData<NovelCommentWithMetadata>;
  novelId: string;
};

const NovelComments = ({ paginatedComments, novelId }: NovelCommentsProps) => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["comments", novelId],
    queryFn: ({ pageParam }) => getNovelComments(novelId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
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

  return (
    <div className="flex flex-col gap-22.5 text-[35px] mt-45 self-center w-325.75 ">
      <form className="flex flex-col">
        <label className="text-[50px] font-medium mb-7.5">Comments:</label>
        <div className="max-w-325.75 relative">
          <Textarea
            placeholder="Type your comment here..."
            className="lg:text-[35px] pb-33.25"
          />
          <SubmitButton
            label="Comment"
            className="w-50 px-[27.5] absolute bottom-7.5 right-7.5"
          />
        </div>
      </form>
      <div className="flex flex-col gap-20 ">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {isFetchingNextPage && <CommentSkeleton />}
        <button
          onClick={() => {
            fetchNextPage();
          }}
        >
          zes
        </button>
      </div>
    </div>
  );
};
export { NovelComments };
