'use server';

import { prisma } from "@/lib/prisma";

export const getNovels = async () => {
    return await prisma.novel.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}