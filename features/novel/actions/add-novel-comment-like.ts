'use server'

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma";

export const addNovelCommentLike = async (novelCommentId: string) => {
    const { user } = await getAuthOrRedirect();

    if (!user) {
        return;
    }

    try {
        await prisma.linkNovelCommentLikes.create({
            data: {
                profileId: user.profile[0].id,
                NovelCommentId: novelCommentId
            }
        })
    } catch (error) {
        console.log(error)
    }
}