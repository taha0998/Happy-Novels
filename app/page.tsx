import { Title } from "@/components/Title";
import { NovelFilter } from "@/features/novels/components/NovelFilter";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <Title />
      <NovelFilter />
    </div>
  );
};
export default HomePage;
