'use server';
import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile"
import { prisma } from "@/lib/prisma";

export const removeNovelCommentReply = async (replyId: string) => {
    const profile = await getProfile();

    try {
        const reply = await prisma.novelCommentReply.findUnique({
            where: { id: replyId }
        })

        if (!profile || !isOwner(profile, reply)) {
            return toActionState('ERROR', 'No Auth')
        }

        await prisma.novelCommentReply.delete({
            where: { id: replyId }
        })

    } catch (error) {
        fromErrorToActionState(error)
    }
    return toActionState('SUCCESS', 'Reply deleted')
}