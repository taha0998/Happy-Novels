'use server';

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

export const addNovelCommentReplyLike = async (NovelCommentReplyId: string) => {
    const { user } = await getAuthOrRedirect()

    if (!user) {
        return;
    }
    const profileId = user.profile[0].id

    try {
        await prisma.linkNovelCommentReplyLikes.create({
            data: {
                NovelCommentReplyId,
                profileId,
            }
        })
    } catch (error) {
        console.log(error)
    }
}