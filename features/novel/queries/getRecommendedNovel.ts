"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getRecommendedNovel = async (novelId: string, recommendedNovelId: string) => {
    const rawRecommendation = unstable_cache(async () => {
        const [recommendedNovel, recommendationInfo] = await prisma.$transaction([
            prisma.novel.findUnique({
                where: {
                    id: recommendedNovelId,
                },
                select: {
                    coverImg: true,
                    id: true,
                    title: true,
                },
            }),
            prisma.novelRecommendation.findUnique({
                where: {
                    recommendedNovelId_targetNovelId: {
                        recommendedNovelId,
                        targetNovelId: novelId
                    }
                }
            })
        ])
        return [recommendedNovel, recommendationInfo] as const;
    })

    const [recommendedNovel, recommendationInfo] = await rawRecommendation()



    return [recommendedNovel, recommendationInfo] as const;
}