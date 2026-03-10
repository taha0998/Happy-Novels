'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addNovelCommentReplyLike = async (NovelCommentReplyId: string) => {
    const profile = await getProfile()

    try {
        if (!profile) {
            return { error: 'add-without-profile' }
        }
        const isLiked = await prisma.linkNovelCommentReplyLikes.findUnique({
            where: {
                profileId_NovelCommentReplyId: {
                    profileId: profile.id,
                    NovelCommentReplyId,
                }
            }
        });
        if (isLiked) { return }

        await prisma.linkNovelCommentReplyLikes.create({
            data: {
                NovelCommentReplyId,
                profileId: profile.id,
            }
        })
    } catch (error) {
        console.log(error)
    }
}