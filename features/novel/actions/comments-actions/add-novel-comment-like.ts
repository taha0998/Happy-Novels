'use server'

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addNovelCommentLike = async (novelCommentId: string) => {
    const profile = await getProfile()


    try {
        if (!profile) {
            return { error: 'add-without-profile' };
        }
        const isLiked = await prisma.linkNovelCommentLike.findUnique({
            where: {
                profileId_novelCommentId: {
                    profileId: profile.id,
                    novelCommentId: novelCommentId
                }
            }
        })
        if (isLiked) {
            return
        }
        await prisma.linkNovelCommentLike.create({
            data: {
                profileId: profile.id,
                novelCommentId,
            }
        })
    } catch (error) {
        console.error(error)
    }
}