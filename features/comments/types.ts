import { Prisma } from "@prisma/client";

export type NovelCommentWithMetadata = Prisma.NovelCommentGetPayload<{
    include: {
        profile: {
            select: {
                username: true,
                userId: true
            }
        },
        novelCommentReplys: { include: { profile: { select: { username: true, userId: true } } } },
        LinkNovelCommentLikes: true,
        _count: { select: { LinkNovelCommentLikes: true } }
    }
}> & {
    isOwner: boolean,
    isLiked: boolean,
    totalLikes: number
};

export type NovelCommentReplyWithMetadata = Prisma.NovelCommentReplyGetPayload<{
    include: {
        profile: {
            select: {
                username: true,
                userId: true
            }
        }
    }
}>
