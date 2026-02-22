import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getChapters = cache(async (novelId: string) => {
  const where = { novelId };
  const skip = 0;
  const take = 50;

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
});
