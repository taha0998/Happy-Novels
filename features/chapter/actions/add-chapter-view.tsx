"use server";

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addChapterView = async (chapterId: string, novelId: string) => {
  const profile = await getProfile();

  try {
    if (!profile) return;
    const viewed = await prisma.chapterView.findUnique({
      where: {
        profileId_chapterId_novelId: {
          profileId: profile.id,
          chapterId,
          novelId,
        },
      },
    });
    if (viewed) return;

    await prisma.chapterView.create({
      data: {
        profileId: profile.id,
        chapterId,
        novelId,
      },
    });
  } catch {}
};
