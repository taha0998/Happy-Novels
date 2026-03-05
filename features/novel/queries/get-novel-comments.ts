"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

export const getNovelComments = async (novelId: string, cursor?: string) => {
    const { user } = await getAuth();
    const take = 10;
    const where = {
        novelId,
        id: {
            lt: cursor,
        }
    }

    // eslint-disable-next-line prefer-const
    let [comments, count] = await prisma.$transaction([
        prisma.novelComment.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            take: take + 1,
            include: {
                profile: {
                    select: {
                        username: true,
                        userId: true
                    }
                },
                novelCommentReplys: {
                    include: {
                        profile: {
                            select: {
                                username: true,
                                userId: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.novelComment.count({
            where,
        })
    ]);
    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return ({
        list: comments.map(comment => ({
            ...comment,
            isOwner: isOwner(user, comment)
        })),
        metadata: {
            count,
            hasNextPage,
            cursor: comments.at(-1)?.id
        }
    })
}