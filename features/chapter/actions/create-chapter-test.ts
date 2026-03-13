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
    const novelId = 'cmmjarau00000vhtkorpkcz6h';

    try {
        const data = createChapterTestShema.parse(
            Object.fromEntries(formData),
        )
        const existChapter = await prisma.chapter.findUnique({
            where: {
                novelId_number: {
                    novelId,
                    number: data.number
                }
            }
        })
        if (existChapter) return toActionState('ERROR', 'Chapter already exist')

        const [newChapter] = await prisma.$transaction([
            prisma.chapter.create({
                data: {
                    novelId,
                    ...data
                }
            }),
            prisma.novel.update({
                where: { id: novelId },
                data: {
                    lastChapterCreatedAt: new Date()
                }
            }),
            prisma.lastChapter.delete({
                where: {
                    novelId,
                }
            }),
            prisma.lastChapter.create({
                data: {
                    number: data.number,
                    novelId,
                }
            })
        ])



        revalidateTag(`chapter-${newChapter.id}`, 'default')

        revalidateTag(`prev-next-chapter-${novelId}-${newChapter.number - 1}`, 'default')
        revalidateTag(`prev-next-chapter-${novelId}-${newChapter.number}`, 'default')
        revalidateTag(`prev-next-chapter-${novelId}-${newChapter.number + 1}`, 'default')

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    revalidatePath(NovelPath(novelId))
    return toActionState('SUCCESS', 'Chapter Created')
}