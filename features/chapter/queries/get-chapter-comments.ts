'use server';

import { isOwner } from "@/features/auth/actions/is-owner";
import { getProfile } from "@/features/auth/queries/get-profile";
import { prisma } from "@/lib/prisma";

export const getChapterComments = async (chapterId: string, cursor?: string) => {
    const profile = await getProfile()

    const take = 10;

    let comments = await prisma.chapterComment.findMany({
        where: {
            chapterId,
            ...(cursor && {
                id: {
                    lt: cursor,
                }
            })
        },
        take: take + 1,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        include: {
            profile: {
                select: {
                    username: true,
                    userId: true
                }
            },
            chapterCommentReply: {
                include: {
                    profile: {
                        select: {
                            userId: true
                        }
                    }
                }
            },
            LinkChapterCommentLike: { where: { profileId: profile?.id } },
            _count: { select: { LinkChapterCommentLike: true } }
        }
    });

    const hasNextPage = comments.length > take;
    comments = hasNextPage ? comments.slice(0, -1) : comments;

    return ({
        list: comments.map(comment => ({
            ...comment,
            isOwner: isOwner(profile, comment) ?? false,
            isLiked: profile ? comment.LinkChapterCommentLike.length > 0 : false,
            totalLikes: comment._count.LinkChapterCommentLike,
        })),
        metadata: {
            hasNextPage,
            cursor: comments.at(-1)?.id
        }
    })
}