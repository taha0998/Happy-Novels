import { SearchParams } from "nuqs/server";
import { Title } from "@/components/Title";
import { NovelFilter } from "@/features/novel/components/NovelFilter";
import { NovelList } from "@/features/novel/components/NovelList";
import { searchParamsCache } from "@/features/novel/SearchParams";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Title />
      <NovelFilter />
      <NovelList searchParams={searchParamsCache.parse(searchParams)} />
    </div>
  );
};
export default HomePage;
