"use server"
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelCommentReplyLike = async (NovelCommentReplyId: string) => {
    const profile = await getProfile()

    if (!profile) { return { error: 'add-without-profile' } }
    try {
        const isLiked = await prisma.linkNovelCommentReplyLikes.findUnique({
            where: {
                profileId_NovelCommentReplyId: {
                    profileId: profile.id,
                    NovelCommentReplyId,
                }
            }
        })

        if (!isLiked) {
            return
        }

        await prisma.linkNovelCommentReplyLikes.delete({
            where: {
                profileId_NovelCommentReplyId: {
                    profileId: profile.id,
                    NovelCommentReplyId,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}