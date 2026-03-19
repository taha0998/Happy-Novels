import { TabsContentJsx } from "@/features/profile/components/ProfileTabs";
import { getWatchLaterNovels } from "@/features/profile/queries/getWatchLaterNovels";

const WatchLaterPage = async () => {
  const watchLaterNovels = await getWatchLaterNovels();
  return (
    <>
      {watchLaterNovels?.map((w) => (
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
export default WatchLaterPage;
