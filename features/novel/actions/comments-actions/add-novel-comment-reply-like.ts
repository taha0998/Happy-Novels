'use server';

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addNovelCommentReplyLike = async (novelCommentReplyId: string) => {
    const profile = await getProfile()

    try {
        if (!profile) {
            return { error: 'add-without-profile' }
        }
        const isLiked = await prisma.linkNovelCommentReplyLikes.findUnique({
            where: {
                profileId_novelCommentReplyId: {
                    profileId: profile.id,
                    novelCommentReplyId,
                }
            }
        });
        if (isLiked) { return }

        await prisma.linkNovelCommentReplyLikes.create({
            data: {
                novelCommentReplyId,
                profileId: profile.id,
            }
        })

    } catch (error) {
        console.error(error)
    }
}