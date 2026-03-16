import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <div className="flex w-440.5 h-15 justify-between items-center self-center mt-1 mb-5">
      <Skeleton className="bg-primary rounded-full h-full w-35 " />
      <Skeleton className="bg-primary rounded-full h-full w-55" />
    </div>
  );
};
export { HeaderSkeleton };
