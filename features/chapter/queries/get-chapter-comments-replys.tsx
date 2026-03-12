"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getChapterCommentReplys = async (
  chapterCommentId: string,
  cursor?: string,
  takeComments?: number,
) => {
  const profile = await getProfile();

  const take = takeComments ? takeComments : 2;

  let replys = await prisma.chapterCommentReply.findMany({
    where: {
      chapterCommentId,
      ...(cursor && {
        id: {
          gt: cursor,
        },
      }),
    },
    take: take + 1,
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    include: {
      profile: { select: { username: true, userId: true } },
      linkChapterCommentReplyLike: { where: { profileId: profile?.id } },
      _count: { select: { linkChapterCommentReplyLike: true } },
    },
  });

  const hasNextPage = replys.length > take;
  replys = hasNextPage ? replys.slice(0, -1) : replys;

  return {
    list: replys.map((reply) => ({
      ...reply,
      isOwner: isOwner(profile, reply) ?? false,
      isLiked: reply.linkChapterCommentReplyLike.length > 0,
      totalLikes: reply._count.linkChapterCommentReplyLike,
    })),
    metadata: {
      hasNextPage,
      cursor: replys.at(-1)?.id,
    },
  };
};
