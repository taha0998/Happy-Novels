import { NovelCommentsProps } from "@/features/novel/components/NovelComments";
import { Comment } from "./Comment";

const Comments = ({ paginatedComments }: NovelCommentsProps) => {
  console.log(paginatedComments);
  return (
    <div className="flex flex-col gap-20 ">
      {paginatedComments.list.map((comment) => (
        <Comment key={comment.id} content={comment.content} />
      ))}
    </div>
  );
};
export { Comments };
