import { Skeleton } from "@/components/ui/skeleton";

const NovelsSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap gap-x-26 gap-y-15 mt-15 ">
      <Skeleton
        className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
      />
      <Skeleton
        className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
      />
      <Skeleton
        className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
      />
      <Skeleton
        className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
      />
      <Skeleton
        className="w-[344.76px] h-[494.73px] rounded-[10px] border-4 border-primary
          transition-all duration-100 ease-in-out 
          hover:border-11  hover:border-primary/90"
      />
    </div>
  );
};

export { NovelsSkeleton };
