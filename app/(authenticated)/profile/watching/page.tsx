import { TabsContentJsx } from "@/features/profile/components/ProfileTabs";
import { getWatchingNovels } from "@/features/profile/queries/getWatchingNovels";

const WatchingPage = async () => {
  const watchingNovels = await getWatchingNovels();
  return (
    <>
      {watchingNovels?.map((w) => (
        <TabsContentJsx
          key={w.novel.id}
          id={w.novel.id}
          title={w.novel.title}
          coverImg={w.novel.coverImg}
        />
      ))}
    </>
  );
};
export default WatchingPage;
