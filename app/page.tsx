import { Title } from "@/components/Title";
import { NovelFilter } from "@/features/novels/components/NovelFilter";
import { NovelList } from "@/features/novels/components/NovelList";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Title />
      <NovelFilter />
      <NovelList />
    </div>
  );
};
export default HomePage;
