"use server";

import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getNovelComments = async (novelId: string, cursor?: string) => {
    const profile = await getProfile()

    const take = 10;
    const where = {
        novelId,
        ...(cursor && {
            id: {
                lt: cursor,
            }
        })
    }




    let comments = await
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
                LinkNovelCommentLikes: {
                    where: { profileId: profile.id }
                },
            }
        });

    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return ({
        list: comments.map((comment) => ({
            ...comment,
            isOwner: isOwner(profile, comment) ?? false,
            isLiked: comment.LinkNovelCommentLikes.length > 0,
            totalLikes: comment._count.LinkNovelCommentLikes,
        })

        ),
        metadata: {
            // count,
            hasNextPage,
            cursor: comments.at(-1)?.id
        }
    })
}