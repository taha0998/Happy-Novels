'use server'
import { getProfile } from "@/features/auth/queries/get-profile"
import { prisma } from "@/lib/prisma"

export const removeChapterCommentLike = async (chapterCommentId: string) => {
    const profile = await getProfile()

    try {
        if (!profile) return { error: 'remove-without-profile' };
        const where = {
            profileId_chapterCommentId: {
                profileId: profile.id,
                chapterCommentId,
            }
        };

        const isLiked = await prisma.linkChapterCommentLike.findUnique({
            where
        });
        if (!isLiked) return;

        await prisma.linkChapterCommentLike.delete({
            where,
        })

    } catch (error) {
        console.error(error)
        return null
    }
}