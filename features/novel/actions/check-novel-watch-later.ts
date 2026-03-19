import { getProfile } from "@/features/auth/queries/get-profile"
import { prisma } from "@/lib/prisma";

export const checkNovelWatchLater = async (novelId: string) => {
    const profile = await getProfile();
    try {
        if (!profile) return false;
        const exist = await prisma.linkWatchLaterNovel.findUnique({
            where: {
                profileId_novelId: {
                    profileId: profile.id,
                    novelId,
                }
            }
        })
        if (exist) return true
        else return false
    } catch {
        return false
    }
}