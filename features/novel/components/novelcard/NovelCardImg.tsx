import Image from "next/image";

type NovelCardImgProps = {
  coverImg: string;
  title: string;
};

const NovelCardImg = ({ coverImg, title }: NovelCardImgProps) => {
  return (
    <div className="min-w-[573.24px] max-h-[822.6px] novel-image-border border-primary rounded-[13.42px]">
      <Image
        src={coverImg}
        alt={`${title} cover image`}
        width={573.24}
        height={822.6}
        className="border-[6.71px] border-primary rounded-[13.42px]"
      />
    </div>
  );
};

export { NovelCardImg };
