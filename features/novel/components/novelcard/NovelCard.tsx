import { Prisma } from "@prisma/client";
import { NovelCardDescription } from "./NovelCardDescription";
import { NovelCardImg } from "./NovelCardImg";
import { NovelCardTitleBar } from "./NovelCardTitleBar";
import { NovelCardTypeButtons } from "./NovelCardTypeButtons";

type NovelCardProps = {
  novel: Prisma.NovelGetPayload<{
    include: {
      LinkTypeNovels: {
        include: {
          type: true;
        };
      };
    };
  }>;
};

const NovelCard = ({ novel }: NovelCardProps) => {
  const types = novel.LinkTypeNovels.map((link) => link.type);

  return (
    <div className="flex  gap-7.5 justify-around  mt-10">
      <NovelCardImg coverImg={novel.coverImg} title={novel.title} />
      <div className="flex flex-col w-289.75 gap-7.5">
        <NovelCardTitleBar
          title={novel.title}
          rating={novel.rating}
          ratingCount={novel.ratingCount}
        />
        <NovelCardTypeButtons types={types} />
        <NovelCardDescription description={novel.description} />
      </div>
    </div>
  );
};

export { NovelCard };
