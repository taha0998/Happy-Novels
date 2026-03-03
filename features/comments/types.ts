import { Prisma } from "@prisma/client";

export type NovelCommentWithMetadata = Prisma.NovelCommentGetPayload<{
    include: {
        profile: {
            select: {
                username: true
            }
        }
    }
}>