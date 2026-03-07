"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

export const getNovelCommentsReplys = async (novelcommentId: string, cursor?: string, takeComments?: number) => {
    const { user } = await getAuth();
    const profileId = user?.profile[0].id

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
                LinkNovelCommentReplyLikes: true,
                _count: {
                    select: { LinkNovelCommentReplyLikes: true }
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
            isOwner: isOwner(user, reply) ?? false,
            isLiked: reply.LinkNovelCommentReplyLikes.some(likedByProfile => likedByProfile.profileId === profileId),
            totalLikes: reply._count.LinkNovelCommentReplyLikes
        })),
        metadata: {
            count,
            hasNextPage,
            cursor: replys.at(-1)?.id
        }
    })

}