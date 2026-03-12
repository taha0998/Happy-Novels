'use server';

import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeChapterCommentReplyLike = async (chapterCommentReplyId: string) => {
    const profile = await getProfile();

    try {
        if (!profile) return { error: 'remove-without-profile' };

        const isLiked = await prisma.linkChapterCommentReplyLike.findUnique({
            where: {
                profileId_chapterCommentReplyId: {
                    profileId: profile.id,
                    chapterCommentReplyId,
                }
            }
        })
        if (!isLiked) return;
        if (!isOwner(profile, isLiked)) return;

        await prisma.linkChapterCommentReplyLike.delete({
            where: {
                profileId_chapterCommentReplyId: {
                    profileId: profile.id,
                    chapterCommentReplyId
                }
            }
        })

    } catch (error) {
        console.error(error)
    }
}