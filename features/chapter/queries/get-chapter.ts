'use server';

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";


export const getChapter = async (chapterId: string) => {
    try {
        if (!chapterId) return null;
        const rawChapter = unstable_cache(async (id: string) => {
            const chapter = await prisma.chapter.findUnique({
                where: { id },
                select: {
                    title: true,
                    number: true,
                    content: true,
                    novelId: true,
                    novel: { select: { title: true } }
                }
            })
            return chapter
        },
            ['chapter-details', chapterId],
            { revalidate: 3600, tags: [`chapter-${chapterId}`] }
        )

        const chapter = await rawChapter(chapterId)

        return chapter

    } catch (error) {
        console.error(error)
        return null
    }
}