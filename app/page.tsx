import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Title } from "@/components/Title";
import { NovelFilter } from "@/features/novel/components/filters/NovelFilter";
import { NovelList } from "@/features/novel/components/NovelList";
import { NovelsSkeleton } from "@/features/novel/components/NovelsSkeleton";
import { searchParamsCache } from "@/features/novel/searchParams";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export const revalidate = 30;

const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Title />
      <NovelFilter />
      <Suspense fallback={<NovelsSkeleton />}>
        <NovelList searchParams={searchParamsCache.parse(searchParams)} />
      </Suspense>
    </div>
  );
};
export default HomePage;
