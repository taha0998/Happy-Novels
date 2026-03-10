type ChapterProps = {
  novelName: string;
  number: number;
  title: string;
  content: string;
};

const Chapter = ({ novelName, number, title, content }: ChapterProps) => {
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <>
      <div className="flex flex-col gap-7.5 mt-40">
        <h1 className="text-[75px] font-semibold">{novelName}</h1>
        <span className="h-0.75 w-337 bg-foreground"></span>
        <h2 className="text-[60px] font-medium">
          Chapter <span className="text-primary">{number}</span> : {title}
        </h2>
        <div
          className="text-[37.21px]/[90.6px] mt-15 
          first-letter:text-primary first-letter:text-[60px] "
        >
          {paragraphs.map((paragraph, index) => (
            <div key={index}>
              <p className="whitespace-pre-line">{paragraph}</p>

              {index < paragraphs.length - 1 && (
                <span className="block h-0.75 w-full bg-background my-4"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Chapter };
