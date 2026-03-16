'use server';

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getTypes = async () => unstable_cache(async () => {
    const types = await prisma.type.findMany({
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
    return types;
},
    ['types'],
    { revalidate: 3600 * 24 * 365, tags: ['types'] })();
