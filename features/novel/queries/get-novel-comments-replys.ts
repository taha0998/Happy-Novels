"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getNovelCommentsReplys = async (novelcommentId: string, cursor?: string, takeComments?: number) => {
    const profile = await getProfile()

    const take = takeComments ? takeComments : 1;
    const where = {
        novelcommentId,
        id: {
            gt: cursor,
        }
    };

    // eslint-disable-next-line prefer-const
    let [replys, count] = await prisma.$transaction([
        prisma.novelCommentReply.findMany({
            where,
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
            take: take + 1,
            include: {
                profile: {
                    select: {
                        username: true,
                        userId: true
                    }
                },
                linkNovelCommentReplyLikes: true,
                _count: {
                    select: { linkNovelCommentReplyLikes: true }
                }

            }
        }),
        prisma.novelCommentReply.count({
            where,
        })
    ]);

    const hasNextPage = replys.length > take;
    replys = hasNextPage ? replys.slice(0, -1) : replys;


    return ({
        list: replys.map(reply => ({
            ...reply,
            isOwner: isOwner(profile, reply) ?? false,
            isLiked: reply.linkNovelCommentReplyLikes.some(likedByProfile => likedByProfile.profileId === profile?.id),
            totalLikes: reply._count.linkNovelCommentReplyLikes
        })),
        metadata: {
            count,
            hasNextPage,
            cursor: replys.at(-1)?.id
        }
    })

}