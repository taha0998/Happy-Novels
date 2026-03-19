'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getWatchingNovels = async () => {
    const profile = await getProfile();

    try {
        if (!profile) return;
        return await prisma.linkWatchingNovel.findMany({
            where: {
                profileId: profile.id
            },
            select: {
                novel: {
                    select: {
                        id: true,
                        title: true,
                        coverImg: true
                    }
                }
            }
        })
    } catch {
    }
}