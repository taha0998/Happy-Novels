"use server"
import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelCommentReplyLike = async (novelCommentReplyId: string) => {
    const profile = await getProfile()

    try {
        if (!profile) { return { error: 'add-without-profile' } }

        const isLiked = await prisma.linkNovelCommentReplyLikes.findUnique({
            where: {
                profileId_novelCommentReplyId: {
                    profileId: profile.id,
                    novelCommentReplyId,
                }
            }
        })
        if (!isLiked) return;
        if (!isOwner(profile, isLiked)) return;

        await prisma.linkNovelCommentReplyLikes.delete({
            where: {
                profileId_novelCommentReplyId: {
                    profileId: profile.id,
                    novelCommentReplyId,
                }
            }
        })
    } catch (error) {
        console.error(error)
    }
}