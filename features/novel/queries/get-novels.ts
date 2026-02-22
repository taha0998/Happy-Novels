'use server';

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../SearchParams";

export const getNovels = cache(async (searchParams: ParsedSearchParams) => {
    const SearchParams = await searchParams;

    const take = 20;
    const skip = SearchParams.page * take

    const [novels, count] = await prisma.$transaction([
        prisma.novel.findMany({
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.novel.count()
    ])

    const hasNext = count > (take + skip)

    return {
        list: novels.map((novel) => ({
            ...novel
        })),
        metadata: {
            count,
            hasNext
        }
    }
})