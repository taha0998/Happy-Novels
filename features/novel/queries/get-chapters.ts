"use server"
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../searchParams";

export const getChapters = cache(
  async (novelId: string, searchParams?: ParsedSearchParams) => {
    const SearchParams = await searchParams;
    const where = { novelId };
    const take = 50;
    const skip = SearchParams ? SearchParams.chaptersPage * take : 0;

    const [chapters, count] = await prisma.$transaction([
      prisma.chapter.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          number: true,
        },
      }),
      prisma.chapter.count({
        where,
      }),
    ]);

    return {
      list: chapters.map((chapter) => ({
        ...chapter,
      })),
      metadata: {
        count,
      },
    };
  },
);
