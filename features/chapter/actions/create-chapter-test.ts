'use server';

import { revalidatePath } from "next/cache";
import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { NovelPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

const createChapterTestShema = z.object({
    title: z.string().min(1).max(1024),
    number: z.coerce.number().min(1).max(9999),
    content: z.string().min(1)
})

export const createChapterTest = async (_actionState: ActionState, formData: FormData) => {

    try {
        const data = createChapterTestShema.parse(
            Object.fromEntries(formData)
        )

        await prisma.chapter.create({
            data: {
                novelId: 'cmmjarau00000vhtkorpkcz6h',
                ...data
            }
        })

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    revalidatePath(NovelPath('cmmjarau00000vhtkorpkcz6h'))
    return toActionState('SUCCESS', 'Chapter Created')
}