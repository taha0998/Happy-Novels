import { Skeleton } from "../ui/skeleton";

const NovelTypeFilterSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-10 mb-120">
      {Array.from({ length: 21 }).map((_, index) => (
        <Skeleton key={index} className="bg-primary rounded-full h-13 w-51" />
      ))}
    </div>
  );
};
export { NovelTypeFilterSkeleton };
