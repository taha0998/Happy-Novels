import { LucideShuffle } from "lucide-react";
import Image from "next/image";

const NovelRecommendation = () => {
  return (
    <div className="flex justify-between items-center">
      <Image
        src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNDuXvzGkInbrYj8ULEeosqcmtWlD3Vf9XzKuN"
        alt="novel Cover"
      />
      <div className="flex flex-col justify-center items-center">
        <h3>
          <span className="text-primary">@Dr568</span> says:
        </h3>
        <p className=" line-clamp-6">
          {`Going against the heavens, Tuoba Ye reincarnated. Body concealing
          Divine Root, hands holding Divine Talisman, possessing previous life's
          experiences, from childhood, began cultivating the most difficult body
          refining method: Mythical Nine Transformations Descz...Going against
          the heavens, Tuoba Ye reincarnated. Body concealing Divine Root, hands
          holding Divine Talisman, possessing previous life's experiences, from
          childhood, began cultivating the most difficult body refining method:
          Mythical Nine Transformations Descz...`}
        </p>
        <LucideShuffle className="text-foreground" />
      </div>
      <Image
        src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNDuXvzGkInbrYj8ULEeosqcmtWlD3Vf9XzKuN"
        alt="novel Cover"
      />
    </div>
  );
};
export { NovelRecommendation };
