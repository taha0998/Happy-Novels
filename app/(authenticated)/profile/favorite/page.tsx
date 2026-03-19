import { TabsContentJsx } from "@/features/profile/components/ProfileTabs";
import { getFavoriteNovels } from "@/features/profile/queries/getFavoriteNovels";

const ProfilePage = async () => {
  const favoriteNovels = await getFavoriteNovels();
  return (
    <>
      {favoriteNovels?.map((f) => (
        <TabsContentJsx
          key={f.novel.id}
          id={f.novel.id}
          title={f.novel.title}
          coverImg={f.novel.coverImg}
        />
      ))}
    </>
  );
};
export default ProfilePage;
