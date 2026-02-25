type ChapterPageProps = {
  params: Promise<{
    chapterId: string;
  }>;
};

const ChapterPage = async ({ params }: ChapterPageProps) => {
  const { chapterId } = await params;
  console.log(chapterId);
  return (
    <>
      <p className="bg-green-800">{chapterId}</p>
    </>
  );
};
export default ChapterPage;
