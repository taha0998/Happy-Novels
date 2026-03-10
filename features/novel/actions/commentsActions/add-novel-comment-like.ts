'use server'

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addNovelCommentLike = async (novelCommentId: string) => {
    const profile = await getProfile()


    try {
        if (!profile) {
            return { error: 'add-without-profile' };
        }
        const isLiked = await prisma.linkNovelCommentLikes.findUnique({
            where: {
                profileId_NovelCommentId: {
                    profileId: profile.id,
                    NovelCommentId: novelCommentId
                }
            }
        })
        if (isLiked) {
            return
        }
        await prisma.linkNovelCommentLikes.create({
            data: {
                profileId: profile.id,
                NovelCommentId: novelCommentId
            }
        })
    } catch (error) {
        console.log(error)
    }
}