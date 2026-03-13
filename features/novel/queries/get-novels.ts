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

    if (filter === 'highest_rate' || !filters.some(e => e === filter)) {
        orderBy = [{ rating: 'desc' }, { createdAt: 'asc' }]
    } else if (filter === 'latest') {
        orderBy = [{ lastChapterCreatedAt: 'desc' }]
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
                //TODO _count Totalviews allTime day/week/month
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