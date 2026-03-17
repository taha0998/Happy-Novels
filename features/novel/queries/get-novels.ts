'use server';

import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../searchParams";
import { getHotNovels } from "./get-hot-novels";

export const getNovels = (async (searchParams: ParsedSearchParams) => {
    const SearchParams = await searchParams;

    const take = 20;
    const skip = SearchParams.page * take
    const filters = ['latest', 'hot', 'most_watched', 'highest_rate', 'types']
    const filter = SearchParams.filterNovels
    let where = {};
    let orderBy = {};

    if (SearchParams.filterNovels === 'hot') {
        const hotTime = SearchParams.hotFilterTime;
        if (hotTime !== '') {
            if (hotTime === 'day') { return await getHotNovels(searchParams, 1) }
            else if (hotTime === 'week') { return await getHotNovels(searchParams, 7) }
            else if (hotTime === 'month') { return await getHotNovels(searchParams, 30) }
        }
        else {
            return await getHotNovels(searchParams, 7)
        }
    }

    if (SearchParams.filterNovels === 'types') {
        const typeSelected = SearchParams.typeNovels
        if (typeSelected !== '') {
            where = {
                linkTypeNovels: {
                    some: {
                        type: {
                            name: SearchParams.typeNovels
                        }
                    }
                },
            }
        } else {
            return {
                list: [],
                metadata: { count: 0, hasNext: false }
            }
        }
    }


    if (filter === 'highest_rate' || !filters.some(e => e === filter)) {
        orderBy = [{ rating: 'desc' }, { createdAt: 'asc' }]
    } else if (filter === 'latest') {
        orderBy = [{ lastChapterCreatedAt: 'desc' }]
    } else if (filter === 'most_watched') {
        where = {
            ChapterView: {
                some: {}
            }
        }
        orderBy = [{ ChapterView: { _count: 'desc' } }]
    }

    const [novels, count] = await prisma.$transaction([
        prisma.novel.findMany({
            where: {
                ...where,
                OR: [
                    {
                        title: {
                            contains: SearchParams.search,
                            mode: 'insensitive' as const

                        }
                    }, {
                        description: {
                            contains: SearchParams.search,
                            mode: 'insensitive' as const
                        }
                    }
                ]
            },
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
                _count: { select: { ChapterView: true } },
            }
        }),
        prisma.novel.count({
            where,
        })
    ])
    const hasNext = count > (take + skip)

    return {
        list: novels.map((novel) => ({
            ...novel,
        })),
        metadata: {
            count,
            hasNext,
        }
    }
})