"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const AddNovelToFavorite = async (novelId: string) => {
  const profile = await getProfile();

  try {
    if (!profile) return toActionState('ERROR', 'No Auth');
    await prisma.linkFavoriteNovel.create({
      data: {
        profileId: profile.id,
        novelId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  return toActionState("SUCCESS", "Novel Added");
};
