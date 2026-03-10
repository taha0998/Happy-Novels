import clsx from "clsx";
import { PrevNextButton } from "@/components/buttons/PrevNextButton";
import { getPrevNextChapter } from "@/features/chapter/queries/get-prev-next-chapter";

type NextPrevGroupProps = {
  number: number;
  novelId: string;
};

const NextPrevGroup = async ({ number, novelId }: NextPrevGroupProps) => {
  const result = await getPrevNextChapter(novelId, number);
  if (!result) return;

  return (
    <>
      <div
        className={clsx("flex gap-24 justify-end", {
          "mr-45": !result.next,
        })}
      >
        {result.prev && <PrevNextButton value="prev" url={result.prev.id} />}
        {result.next && <PrevNextButton value="next" url={result.next.id} />}
      </div>
    </>
  );
};
export { NextPrevGroup };
