import { DefaultProfileCard } from "./DefaultProfileCard";
import { DefaultProfileCover } from "./DefaultProfileCover";
import { ProfileTabs } from "./ProfileTabs";

const Profile = () => {
  return (
    <>
      <DefaultProfileCover />
      <div className="flex gap-10 mt-10">
        <DefaultProfileCard />
        <ProfileTabs />
      </div>
    </>
  );
};
export { Profile };
