'use server';

import { revalidatePath, revalidateTag } from "next/cache";
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
        const existChapter = await prisma.chapter.findUnique({
            where: {
                novelId_number: {
                    novelId: 'cmmjarau00000vhtkorpkcz6h',
                    number: data.number
                }
            }
        })
        if (existChapter) return toActionState('ERROR', 'Chapter already exist')

        const newChapter = await prisma.chapter.create({
            data: {
                novelId: 'cmmjarau00000vhtkorpkcz6h',
                ...data
            }
        })


        revalidateTag(`chapter-${newChapter.id}`, 'default')

        revalidateTag(`prev-next-chapter-cmmjarau00000vhtkorpkcz6h-${newChapter.number - 1}`, 'default')
        revalidateTag(`prev-next-chapter-cmmjarau00000vhtkorpkcz6h-${newChapter.number}`, 'default')
        revalidateTag(`prev-next-chapter-cmmjarau00000vhtkorpkcz6h-${newChapter.number + 1}`, 'default')

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    revalidatePath(NovelPath('cmmjarau00000vhtkorpkcz6h'))
    return toActionState('SUCCESS', 'Chapter Created')
}