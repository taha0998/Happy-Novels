'use server';

import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

const createChapterCommentShema = z.object({
    content: z.string().min(1, { message: "Please enter a comment before submitting." }).max(1024)
})

export const createChapterComment = async (chapterId: string, _actionState: ActionState, formData: FormData) => {
    const profile = await getProfile()
    try {
        if (!profile) return toActionState('ERROR', 'No Auth');

        const data = createChapterCommentShema.parse(
            Object.fromEntries(formData)
        );

        await prisma.chapterComment.create({
            data: {
                chapterId,
                profileId: profile.id,
                ...data
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }
    return toActionState('SUCCESS', 'Comment created')
}