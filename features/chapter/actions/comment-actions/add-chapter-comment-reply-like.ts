'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addChapterCommentReplyLike = async (chapterCommentReplyId: string) => {
    const profile = await getProfile();

    try {
        if (!profile) return { error: 'add-without-profile' }

        const isLiked = await prisma.linkChapterCommentReplyLike.findUnique({
            where: {
                profileId_chapterCommentReplyId: {
                    profileId: profile.id,
                    chapterCommentReplyId,
                }
            },
        });
        if (isLiked) return;

        await prisma.linkChapterCommentReplyLike.create({
            data: {
                profileId: profile.id,
                chapterCommentReplyId,
            }
        })

    } catch (error) {
        console.error(error)
    }
}