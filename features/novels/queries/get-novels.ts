'use server';

import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../SearchParams";

export const getNovels = async (searchParams: ParsedSearchParams) => {
    const SearchParams = await searchParams;

    const take = 20;
    const skip = SearchParams.page * take

    return await prisma.novel.findMany({
        skip,
        take,
        orderBy: {
            createdAt: 'desc'
        }
    })
}