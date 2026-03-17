'use server';

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getTypes = async () => {
    try {
        const rawGetTypes = unstable_cache(async () => {
            return await prisma.type.findMany({
                orderBy: {
                    linkTypeNovels: {
                        _count: 'desc'
                    }
                },
                include: {
                    _count: {
                        select: { linkTypeNovels: true }
                    }
                }
            })
        },
            ['types'],
            { revalidate: 3600 * 24 * 14, tags: ['types'] });

        const types = await rawGetTypes()
        return types


    } catch (error) {
        console.error(error)
    }
}
