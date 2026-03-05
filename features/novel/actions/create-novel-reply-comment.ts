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


export const createNovelReplyComment = async (commentId: string, novelId: string, _actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect();

    if (!user || !user.profile) {
        return toActionState('ERROR', 'no auth')
    }

    try {
        const data = createNovelReplyCommentShema.parse(
            Object.fromEntries(formData)
        );

        await prisma.novelCommentReply.create({
            data: {
                novelcommentId: commentId,
                profileId: user.profile[0].id,
                ...data
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }
    revalidatePath(NovelPath(novelId))
    return toActionState('SUCCESS', 'Reply created')
}