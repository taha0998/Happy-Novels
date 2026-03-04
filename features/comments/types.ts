import { Prisma } from "@prisma/client";

export type NovelCommentWithMetadata = Prisma.NovelCommentGetPayload<{
    include: {
        profile: {
            select: {
                username: true,
                userId: true
            }
        },
        novelCommentReplys: true
    }
}>;

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