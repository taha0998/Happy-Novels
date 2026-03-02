import { prisma } from "@/lib/prisma"

export const getRecommendedInNovel = async (targetNovelId: string, recommendedNovelId: string) => {
    const [targetNovel, targetNovelInfo] = await prisma.$transaction([
        prisma.novel.findUnique({
            where: {
                id: targetNovelId,
            },
            select: {
                id: true,
                title: true,
                coverImg: true
            }
        }),
        prisma.novelRecommendation.findUnique({
            where: {
                recommendedNovelId_targetNovelId: {
                    targetNovelId,
                    recommendedNovelId,
                }
            }
        })
    ])
    return [targetNovel, targetNovelInfo] as const;
}
