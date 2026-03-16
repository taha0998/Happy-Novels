import { NovelsSkeleton } from "@/features/novel/components/NovelsSkeleton";
import { Skeleton } from "../ui/skeleton";

const FirstHomePageSkeleton = () => {
  return (
    <>
      <div className="flex gap-5 mt-20 mb-15">
        <Skeleton className="bg-primary rounded-full h-13 w-39" />
        <Skeleton className="bg-primary rounded-full h-13 w-30" />
        <Skeleton className="bg-primary rounded-full h-13 w-60" />
        <Skeleton className="bg-primary rounded-full h-13 w-57" />
        <Skeleton className="bg-primary rounded-full h-13 w-37 mr-27" />
        <Skeleton className="bg-primary rounded-full h-13 w-158" />
      </div>
      <div className="">
        <NovelsSkeleton />
      </div>
    </>
  );
};
export { FirstHomePageSkeleton };
