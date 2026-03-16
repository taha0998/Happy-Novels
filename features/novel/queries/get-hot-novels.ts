'use server';

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../searchParams";

export const getHotNovels = async (searchParams: ParsedSearchParams, time: number) => {
    const SearchParams = await searchParams;
    const take = 20;
    const skip = SearchParams.page * take;



    const now = new Date();

    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() - time);

    const [rawNovels, [{ count }]] = await prisma.$transaction([
        prisma.$queryRaw<{
            id: string;
            coverImg: string;
            title: string;
            rating: number;
            ratingCount: number;
            chapterViewCount: bigint;
            lastChapterNumber: number | null;
        }[]>(
            Prisma.sql`
        SELECT
            n."id",
            n."coverImg",
            n."title",
            n."rating",
            n."ratingCount",
            COUNT(DISTINCT cv."id") AS "chapterViewCount",
            MAX(c."number") AS "lastChapterNumber"
        FROM "Novel" n
        LEFT JOIN "ChapterView" cv
            ON cv."novelId" = n."id"
            AND cv."createdAt" >= ${selectedDate}
            AND cv."createdAt" <= ${now}
        LEFT JOIN "Chapter" c
            ON c."novelId" = n."id"
        GROUP BY n."id", n."coverImg", n."title", n."rating", n."ratingCount"
        HAVING COUNT(DISTINCT cv."id") > 0
        ORDER BY "chapterViewCount" DESC
        LIMIT ${take} OFFSET ${skip}
    `
        ),
        prisma.$queryRaw<{ count: bigint }[]>(
            Prisma.sql`
                SELECT COUNT(*) AS count
                FROM (
                    SELECT n."id"
                    FROM "Novel" n
                    LEFT JOIN "ChapterView" cv
                        ON cv."novelId" = n."id"
                        AND cv."createdAt" >= ${selectedDate}
                        AND cv."createdAt" <= ${now}
                    GROUP BY n."id"
                    HAVING COUNT(DISTINCT cv."id") > 0
                ) AS filtered_novels
            `
        )
    ])


    const transformedNovels = rawNovels.map(novel => ({
        ...novel,
        LastChapter: novel.lastChapterNumber !== null
            ? { number: novel.lastChapterNumber }
            : null,
        _count: {
            ChapterView: Number(novel.chapterViewCount)
        }
    }));

    const hasNext = count > (take + skip);


    return {
        list: transformedNovels,
        metadata: {
            count,
            hasNext,
        }
    };

}
