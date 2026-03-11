"use server"
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelCommentReplyLike = async (novelCommentReplyId: string) => {
    const profile = await getProfile()

    if (!profile) { return { error: 'add-without-profile' } }
    try {
        const isLiked = await prisma.linkNovelCommentReplyLikes.findUnique({
            where: {
                profileId_novelCommentReplyId: {
                    profileId: profile.id,
                    novelCommentReplyId,
                }
            }
        })

        if (!isLiked) {
            return
        }

        await prisma.linkNovelCommentReplyLikes.delete({
            where: {
                profileId_novelCommentReplyId: {
                    profileId: profile.id,
                    novelCommentReplyId,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}