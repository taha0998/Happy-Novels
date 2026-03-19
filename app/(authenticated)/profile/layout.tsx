import { Tabs } from "@/components/ui/tabs";
import { getProfile } from "@/features/auth/queries/get-profile";
import { DefaultProfileCard } from "@/features/profile/components/DefaultProfileCard";
import { DefaultProfileCover } from "@/features/profile/components/DefaultProfileCover";
import { TabsListJsx } from "@/features/profile/components/ProfileTabs";
import { getChaptersRead } from "@/features/profile/queries/getChaptersRead";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, chapterReadCount] = await Promise.all([
    getProfile(),
    getChaptersRead(),
  ]);
  return (
    <>
      <div className="flex flex-col w-[91%] self-center mt-5">
        <DefaultProfileCover />
        <div className="flex gap-10 mt-10">
          <DefaultProfileCard
            profile={profile}
            chapterReadCount={chapterReadCount}
          />
          <Tabs defaultValue="Favorite">
            {TabsListJsx()}
            <div className="h-1 w-[95.6%] bg-foreground/30  mt-1.75 ml-px rounded-full"></div>
            <div className="max-w-317 flex flex-wrap gap-7.25 mt-7.5">
              {children}
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
