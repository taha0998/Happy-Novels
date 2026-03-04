import { Skeleton } from "../ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-7.5">
      <Skeleton className=" h-20 w-20 min-w-20 max-h-20 bg-primary rounded-full" />
      <Skeleton className=" h-40  w-300 bg-primary rounded-[10px]" />
    </div>
  );
};
export { CommentSkeleton };
