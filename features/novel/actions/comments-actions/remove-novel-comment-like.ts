'use server';
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelCommentLike = async (novelCommentId: string) => {
    const profile = await getProfile()

    try {
        if (!profile) return { error: 'remove-without-profile' };
        const where = {
            profileId_novelCommentId: {
                profileId: profile.id,
                novelCommentId: novelCommentId
            }
        }

        const isLiked = await prisma.linkNovelCommentLike.findUnique({
            where,
        })
        if (!isLiked) return;

        await prisma.linkNovelCommentLike.delete({
            where,
        })

    } catch (error) {
        console.error(error)
        return null
    }
}