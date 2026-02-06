import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering";
import { NovelFilter } from "@/features/novels/components/NovelFilter";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[91%] self-center">
      <h1
        className="text-[85px] leading-none 
       md:text-[90px]  md:leading-30
       lg:text-[clamp(119px,11vw,150px)] lg:leading-45
       xl:text-[clamp(145px,11vw,200px)] xl:leading-60
       mt-15 font-semibold text-center selection:text-foreground selection:bg-primary "
      >
        <span className="text-primary selection:text-popover">
          <ShimmeringText text="Happy " wave={true} />
        </span>
        Novels, For a
        <span className="text-primary selection:text-popover">
          <ShimmeringText text=" Happy " wave={true} />
        </span>
        Day
      </h1>
      <NovelFilter />
    </div>
  );
};
export default HomePage;
