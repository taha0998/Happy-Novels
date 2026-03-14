'use server';

import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../searchParams";

export const getNovels = (async (searchParams: ParsedSearchParams) => {
    const SearchParams = await searchParams;

    const take = 20;
    const skip = SearchParams.page * take
    const filters = ['latest', 'hot', 'most_watched', 'highest_rate', 'types']
    const filter = SearchParams.filterNovels
    // let where = {};
    let orderBy = {};

    if (SearchParams.filterNovels === 'hot') {
        const hotTime = SearchParams.hotFilterTime;
        if (hotTime === "") {
            return {
                list: [],
                metadata: { count: 0, hasNext: false }
            }
        } else if (hotTime === 'day') {

            // // actions/novels.ts
            // export async function getTrendingNovels(
            //     period: TimePeriod = 'week',
            //     limit: number = 10
            // ): Promise<NovelViewStats[]> {
            //     const now = new Date()
            //     let startDate: Date

            //     switch (period) {
            //         case 'day':
            //             startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            //             break
            //         case 'week':
            //             startDate = new Date(now)
            //             startDate.setDate(now.getDate() - 7)
            //             break
            //         case 'month':
            //             startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            //             break
            //     }

            //     // Step 1: Get novelIds with view counts
            //     const novelViews = await prisma.chapterView.groupBy({
            //         by: ['novelId'],
            //         where: {
            //             createdAt: { gte: startDate },
            //         },
            //         _count: { id: true },
            //         orderBy: { _count: { id: 'desc' } },
            //         take: limit,
            //     })

            //     // Step 2: Fetch novel details
            //     const novelIds = novelViews.map((nv) => nv.novelId)

            //     if (novelIds.length === 0) return []

            //     const novels = await prisma.novel.findMany({
            //         where: { id: { in: novelIds } },
            //         select: {
            //             id: true,
            //             title: true,
            //             coverImg: true,
            //             rating: true,
            //             ratingCount: true,
            //         },
            //     })

            //     // Step 3: Combine results
            //     const viewCountMap = new Map(
            //         novelViews.map((nv) => [nv.novelId, nv._count.id])
            //     )

            //     return novels.map((novel) => ({
            //         novelId: novel.id,
            //         title: novel.title,
            //         coverImg: novel.coverImg,
            //         rating: novel.rating,
            //         ratingCount: novel.ratingCount,
            //         viewCount: viewCountMap.get(novel.id) ?? 0,
            //     }))
            // }

        }
    }



    if (filter === 'highest_rate' || !filters.some(e => e === filter)) {
        orderBy = [{ rating: 'desc' }, { createdAt: 'asc' }]
    } else if (filter === 'latest') {
        orderBy = [{ lastChapterCreatedAt: 'desc' }]
    } else if (filter === 'most_watched') {
        orderBy = [{ ChapterView: { _count: 'desc' } }]
    }


    const [novels, count] = await prisma.$transaction([
        prisma.novel.findMany({
            skip,
            take,
            orderBy,
            select: {
                id: true,
                coverImg: true,
                title: true,
                rating: true,
                ratingCount: true,
                LastChapter: { select: { number: true } },
                _count: { select: { ChapterView: true } }
                //TODO _count Totalviews day/week/month
            }
        }),
        prisma.novel.count()
    ])

    const hasNext = count > (take + skip)

    return {
        list: novels.map((novel) => ({
            ...novel,
        })),
        metadata: {
            count,
            hasNext
        }
    }
})