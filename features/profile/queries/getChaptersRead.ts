'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getChaptersRead = async () => {
    const profile = await getProfile();

    try {
        if (!profile) return;
        return await prisma.chapterView.count({
            where: { profileId: profile.id }
        })
    } catch {
    }
}