'use server';

import { revalidatePath } from "next/cache";
import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { NovelPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const createNovelReplyCommentShema = z.object({
    content: z.string().min(1, { message: "reply can't be empty" }).max(1024)
})


export const createNovelReplyComment = async (commentId: string, novelId: string, isReply: boolean, replyId: string | undefined, _actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect();

    if (!user || !user.profile) {
        return toActionState('ERROR', 'no auth')
    }
    if (isReply && !replyId) {
        return toActionState('ERROR', 'Target Reply is missing.')
    }

    try {
        const data = createNovelReplyCommentShema.parse(
            Object.fromEntries(formData)
        );

        let comment;
        let replyTo;
        if (isReply) {
            comment = await prisma.novelCommentReply.findUnique({
                where: { id: replyId }
            })
            const replyToProfile = await prisma.profile.findUnique({
                where: { id: comment?.profileId }
            })
            replyTo = replyToProfile?.username
        } else {
            comment = await prisma.novelComment.findUnique({
                where: { id: commentId }
            })
        }

        await prisma.novelCommentReply.create({
            data: {
                novelcommentId: commentId,
                profileId: user.profile[0].id,
                replyTo,
                ...data
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }
    revalidatePath(NovelPath(novelId))
    return toActionState('SUCCESS', 'Reply created')
}