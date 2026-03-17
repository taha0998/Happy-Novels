import { getAuth } from "@/features/auth/queries/get-auth";
import { ProfileModule } from "./ProfileModule";

const ProfileForm = async () => {
  const { user } = await getAuth();
  const profile = user?.profile[0];
  return <>{user ? profile ? <></> : <ProfileModule /> : <></>}</>;
};
export { ProfileForm };
