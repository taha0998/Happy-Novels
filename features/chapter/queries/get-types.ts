'use server';

import { prisma } from "@/lib/prisma";

export const getTypes = async () => {
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
}
