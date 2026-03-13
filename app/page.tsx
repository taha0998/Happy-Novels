import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Title } from "@/components/Title";
import { NovelFilter } from "@/features/novel/components/NovelFilter";
import { NovelList } from "@/features/novel/components/NovelList";
import { NovelsSkeleton } from "@/features/novel/components/NovelsSkeleton";
import { searchParamsCache } from "@/features/novel/searchParams";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export const revalidate = 30;

const HomePage = ({ searchParams }: HomePageProps) => {
  const parsedParams = searchParamsCache.parse(searchParams);
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Title />
      <NovelFilter />
      <Suspense fallback={<NovelsSkeleton />}>
        <NovelList searchParams={parsedParams} />
      </Suspense>
    </div>
  );
};
export default HomePage;
