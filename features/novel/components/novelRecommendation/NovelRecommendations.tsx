import { Novel } from "@prisma/client";
import { NovelRecommendation } from "./NovelRecommendation";
import { NovelRecommendedIn } from "./NovelRecommendedIn";

type NovelRecommendationsProps = {
  novelsIds: string[] | undefined;
  novel: Novel;
  target: boolean;
};

const NovelRecommendations = ({
  novelsIds,
  novel,
  target,
}: NovelRecommendationsProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-7.5 mt-15">
      <h2 className="text-primary text-[70px] font-medium">
        {target ? (
          <>Recommendation:</>
        ) : (
          <>
            Recommeded <span className="text-foreground">In:</span>
          </>
        )}
      </h2>
      {novelsIds?.map((rId) =>
        target ? (
          <NovelRecommendation
            key={rId}
            novelId={novel.id}
            recommendedNovelId={rId}
            targetNovelCover={novel.coverImg}
            targetNovelTitle={novel.title}
          />
        ) : (
          <NovelRecommendedIn
            key={rId}
            targetNovelId={rId}
            recommendedNovelId={novel.id}
            recommendedNovelCover={novel.coverImg}
            recommendedNovelTitle={novel.title}
          />
        ),
      )}
    </div>
  );
};
export { NovelRecommendations };
