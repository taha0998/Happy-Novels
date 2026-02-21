import { prisma } from "@/lib/prisma"

export const getNovel = async (id: string) => {
    return await prisma.novel.findUnique({
        where: {
            id,
        },
        include: {
            LinkTypeNovels: {
                include: {
                    type: true,
                }
            }
        }
    })
}