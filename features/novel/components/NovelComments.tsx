import { SubmitButton } from "@/components/form/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { Comments } from "@/features/comments/components/Comments";
import { NovelCommentWithMetadata } from "@/features/comments/types";
import { PaginationData } from "@/types/PaginationData";

export type NovelCommentsProps = {
  paginatedComments: PaginationData<NovelCommentWithMetadata>;
};

const NovelComments = ({ paginatedComments }: NovelCommentsProps) => {
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
      <Comments paginatedComments={paginatedComments} />
    </div>
  );
};
export { NovelComments };
