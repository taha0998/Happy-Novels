'use server';
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma";

export const removeNovelCommentLike = async (commentId: string) => {
    const { user } = await getAuthOrRedirect()

    if (!user) {
        return;
    }

    try {
        await prisma.linkNovelCommentLikes.delete({
            where: {
                profileId_NovelCommentId: {
                    profileId: user.profile[0].id,
                    NovelCommentId: commentId,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}