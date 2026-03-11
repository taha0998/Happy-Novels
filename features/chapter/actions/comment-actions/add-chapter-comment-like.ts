'use server'
import { getProfile } from "@/features/auth/queries/get-profile"
import { prisma } from "@/lib/prisma";

export const addChapterCommentLike = async (chapterCommentId: string) => {
    const profile = await getProfile();

    try {
        if (!profile) { return { error: 'add-without-profile' } }

        const isLiked = await prisma.linkChapterCommentLike.findUnique({
            where: {
                profileId_chapterCommentId: {
                    profileId: profile.id,
                    chapterCommentId
                }
            }
        })
        if (isLiked) return;

        await prisma.linkChapterCommentLike.create({
            data: {
                profileId: profile.id,
                chapterCommentId
            }
        })
    } catch (error) {
        console.error(error);
    }
}