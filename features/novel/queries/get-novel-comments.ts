"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

export const getNovelComments = async (novelId: string, cursor?: string) => {
    const { user } = await getAuthOrRedirect();
    const profileId = user?.profile[0]?.id;

    const take = 10;
    const where = {
        novelId,
        id: {
            lt: cursor,
        }
    }

    if (!user) {
        return {
            list: [],
            metadata: {
                count: 0,
                hasNextPage: false,
                cursor: undefined
            }
        };
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
                },
                _count: {
                    select: { LinkNovelCommentLikes: true }
                },
                LinkNovelCommentLikes: profileId ? {
                    where: { profileId, },
                    select: { id: true }
                } : false,
            }
        }),
        prisma.novelComment.count({
            where,
        })
    ]);
    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return ({
        list: comments.map((comment) => ({
            ...comment,
            isOwner: isOwner(user, comment) ?? false,
            isLiked: comment.LinkNovelCommentLikes.length > 0,
            totalLikes: comment._count.LinkNovelCommentLikes,
        })

        ),
        metadata: {
            count,
            hasNextPage,
            cursor: comments.at(-1)?.id
        }
    })
}