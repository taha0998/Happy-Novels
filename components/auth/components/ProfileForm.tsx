import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { ProfileModule } from "./ProfileModule";

const ProfileForm = async () => {
  const { user } = await getAuthOrRedirect();
  const profile = user?.profile[0];
  return <>{user ? profile ? <></> : <ProfileModule /> : <></>}</>;
};
export { ProfileForm };
