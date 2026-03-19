"use server";

import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const addChapterView = async (chapterId: string, novelId: string) => {
  const profile = await getProfile();

  try {
    if (!profile) return;
    await prisma.chapterView.create({
      data: {
        profileId: profile.id,
        chapterId,
        novelId,
      },
    });
  } catch {}
};
