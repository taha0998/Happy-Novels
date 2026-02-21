type NovelCardDescriptionProps = {
  description: string;
};

const NovelCardDescription = ({ description }: NovelCardDescriptionProps) => {
  return (
    <p className="line-clamp-7 w-252.75 text-[36px]/[50px] font-medium">
      {description}
    </p>
  );
};

export { NovelCardDescription };
