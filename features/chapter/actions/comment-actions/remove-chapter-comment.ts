'use server';

import { toActionState } from "@/components/form/utils/to-action-state";
import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeChapterComment = async (chapterCommentId: string) => {
    const profile = await getProfile();

    try {
        if (!profile) return toActionState('ERROR', 'No Auth')
        const comment = await prisma.chapterComment.findUnique({
            where: { id: chapterCommentId }
        })

        if (!isOwner(profile, comment)) {
            return toActionState('ERROR', 'No Auth')
        }

        await prisma.chapterComment.delete({
            where: { id: chapterCommentId }
        })

    } catch (error) {
        console.error(error);
    }

    return toActionState('SUCCESS', 'Comment deleted')
}