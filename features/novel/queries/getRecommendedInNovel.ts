import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma"

export const getRecommendedInNovel = async (targetNovelId: string, recommendedNovelId: string) => {
    const rawRecommendationIn = unstable_cache(async () => {
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
        return [targetNovel, targetNovelInfo] as const
    },
        ['recommendation-details', recommendedNovelId],
        { revalidate: 3600, tags: [`recommendation-${recommendedNovelId}`] }
    )
    const [targetNovel, targetNovelInfo] = await rawRecommendationIn()

    return [targetNovel, targetNovelInfo] as const;
}
