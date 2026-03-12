'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

const createChapterReplyCommentShema = z.object({
    content: z.string().min(1, { message: "reply can't be empty" }).max(1024)
})

export const createChapterReplyComment = async (commentId: string, chapterId: string, isReply: boolean, replyId: string | undefined, _actionState: ActionState, formData: FormData) => {
    const profile = await getProfile();

    if (!profile) return toActionState('ERROR', 'No Auth');
    if (isReply && !replyId) return toActionState('ERROR', 'Target Reply is missing.');

    try {
        const data = createChapterReplyCommentShema.parse(
            Object.fromEntries(formData)
        );

        let replyTo;

        if (isReply) {
            const commentReplyTo = await prisma.chapterCommentReply.findUnique({
                where: { id: replyId }
            })
            const replyToProfile = await prisma.profile.findUnique({
                where: { id: commentReplyTo?.profileId },
                select: { username: true, userId: true }
            })
            replyTo = replyToProfile?.username
        }

        await prisma.chapterCommentReply.create({
            data: {
                chapterCommentId: commentId,
                profileId: profile.id,
                replyTo,
                ...data
            }
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }
    return toActionState('SUCCESS', 'Reply created')
}