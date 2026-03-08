'use server';

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const removeNovelComment = async (commentId: string) => {
    const profile = await getProfile()

    try {
        const comment = await prisma.novelComment.findUnique({
            where: { id: commentId }
        })

        if (!profile || !isOwner(profile, comment)) {
            return toActionState('ERROR', 'No Auth')
        }

        await prisma.novelComment.delete({
            where: { id: commentId }
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }


    return toActionState("SUCCESS", "Comment deleted")
}