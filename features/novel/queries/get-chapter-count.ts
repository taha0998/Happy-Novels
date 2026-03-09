'use server'
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getChapterCount = unstable_cache(async (novelId: string) => {
    const count = await prisma.chapter.count({
        where: { novelId }
    })
    return count;
},
    ["novel-chapters-count"],
    {
        revalidate: 3600,
        tags: ["chapters-count"],
    }
)