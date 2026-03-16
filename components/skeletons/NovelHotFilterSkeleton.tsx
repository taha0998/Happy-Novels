import { NovelsSkeleton } from "@/features/novel/components/NovelsSkeleton";
import { Skeleton } from "../ui/skeleton";

const NovelHotFilterSkeleton = () => {
  return (
    <>
      <Skeleton className="bg-primary rounded-full h-13 w-107 mb-15" />
      <NovelsSkeleton />
    </>
  );
};
export { NovelHotFilterSkeleton };
