type NovelPageProps = {
  params: Promise<{
    novelId: string;
  }>;
};
const NovelPage = async ({ params }: NovelPageProps) => {
  const { novelId } = await params;
  return <div>{novelId}</div>;
};
export default NovelPage;
