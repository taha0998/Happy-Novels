'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getFavoriteNovels = async () => {
    const profile = await getProfile();

    try {
        if (!profile) return;

        await prisma.linkFavoriteNovel.findMany({
            where: {
                profileId: profile.id
            }
        })
    } catch (error) {
        console.error(error)
    }
}