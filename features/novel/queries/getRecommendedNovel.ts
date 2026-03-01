"use server";

import { prisma } from "@/lib/prisma";

export const getRecommendedNovel = async (novelId: string, recommendedNovelId: string) => {
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
}