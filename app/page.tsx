import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { FirstHomePageSkeleton } from "@/components/skeletons/FirstHomePageSkeleton";
import { NovelList } from "@/features/novel/components/NovelList";
import { searchParamsCache } from "@/features/novel/searchParams";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export const revalidate = 3600;

const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Suspense fallback={<FirstHomePageSkeleton />}>
        <NovelList searchParams={searchParamsCache.parse(searchParams)} />
      </Suspense>
    </div>
  );
};
export default HomePage;
