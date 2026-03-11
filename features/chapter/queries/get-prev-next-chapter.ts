"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getPrevNextChapter = async (novelId: string, number: number) => {
  try {
    if (!novelId || !number) return null;

    const getCachedPrevNext = unstable_cache(
      async (id: string, num: number) => {
        const [prev, next] = await Promise.all([
          prisma.chapter.findFirst({
            where: {
              novelId: id,
              number: num - 1,
            },
            select: { id: true },
          }),
          prisma.chapter.findFirst({
            where: {
              novelId: id,
              number: num + 1,
            },
            select: { id: true },
          }),
        ]);

        return {
          prev: prev ?? null,
          next: next ?? null,
        };
      },
      ["prev-next-chapter", novelId, String(number)],
      { revalidate: 3600, tags: [`prev-next-chapter-${novelId}-${number}`] },
    );

    const result = await getCachedPrevNext(novelId, number);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
