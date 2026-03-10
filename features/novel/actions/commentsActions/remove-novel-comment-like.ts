'use server';
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelCommentLike = async (novelCommentId: string) => {
    const profile = await getProfile()

    if (!profile) { return { error: 'remove-without-profile' } }

    try {

        const isLiked = await prisma.linkNovelCommentLikes.findUnique({
            where: {
                profileId_NovelCommentId: {
                    profileId: profile.id,
                    NovelCommentId: novelCommentId
                }
            }
        })
        if (!isLiked) {
            return
        }

        await prisma.linkNovelCommentLikes.delete({
            where: {
                profileId_NovelCommentId: {
                    profileId: profile.id,
                    NovelCommentId: novelCommentId,
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}