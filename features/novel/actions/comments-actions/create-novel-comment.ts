'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

const createNovelCommentShema = z.object({
    content: z.string().min(1, { message: "Please enter a comment before submitting." }).max(1024),
})


export const createNovelComment = async (novelId: string, _actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect()

    if (!user?.profile[0] || !user) {
        return toActionState('ERROR', 'Not Auth')
    }
    try {
        const data = createNovelCommentShema.parse(Object.fromEntries(formData))
        const profileId = user.profile[0].id;

        await prisma.novelComment.create({
            data: {
                novelId,
                profileId,
                content: data.content,
            },
        })

    } catch (error) {
        return fromErrorToActionState(error)
    }
    return toActionState('SUCCESS', 'Comment created')
}