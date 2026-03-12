'use server';

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeChapterCommentReply = async (replyId: string) => {
    const profile = await getProfile();

    try {
        if (!profile) return toActionState('ERROR', 'No Auth');

        const reply = await prisma.chapterCommentReply.findUnique({
            where: { id: replyId }
        })
        if (!isOwner(profile, reply)) return toActionState('ERROR', 'No Auth');

        await prisma.chapterCommentReply.delete({
            where: { id: replyId }
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }
    return toActionState('SUCCESS', 'Reply deleted')
}