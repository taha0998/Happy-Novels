"use server"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma";

export const removeNovelCommentReplyLike = async (NovelCommentReplyId: string) => {
    const { user } = await getAuthOrRedirect();

    if (!user) {
        return;
    }
    const profileId = user.profile[0].id

    try {
        await prisma.linkNovelCommentReplyLikes.delete({
            where: {
                profileId_NovelCommentReplyId: {
                    profileId,
                    NovelCommentReplyId,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}