'use server'

import { ParsedSearchParams } from "@/features/novel/searchParams"
import { prisma } from "@/lib/prisma"

export const getTypeCount = async (typeNovelName: string, searchParams: ParsedSearchParams) => {
    const SearchParams = await searchParams;
    return await prisma.linkTypeNovel.count({
        where: {
            type: {
                name: typeNovelName
            },
            OR: [
                {
                    novel: {
                        title: {
                            contains: SearchParams.search,
                            mode: 'insensitive' as const
                        }
                    }
                },
                {
                    novel: {
                        description: {
                            contains: SearchParams.search,
                            mode: 'insensitive' as const
                        }
                    }
                }
            ]

        }
    })

}
