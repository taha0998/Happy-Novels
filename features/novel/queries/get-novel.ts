"use server"
import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

export const getNovel = async (id: string) => unstable_cache(async () => {
    return await prisma.novel.findUnique({
        where: {
            id,
        },
        include: {
            LinkTypeNovels: {
                include: {
                    type: true,
                }
            },
            recommendations: true,
            recommendedIn: true,
        },
    })
},
    ["novel-details", id],
    { revalidate: 3600, tags: [`novel-${id}`] }
)();