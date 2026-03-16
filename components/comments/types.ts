import { Prisma } from "@prisma/client";

//Novel on filter

export type NovelFilterType = {
    LastChapter: {
        number: number;
    } | null;
    _count: {
        ChapterView: number;
    };
    id: string;
    coverImg: string;
    title: string;
    rating: number;
    ratingCount: number;
    chapterViewCount?: bigint;
    lastChapterNumber?: number | null;
};

export type NovelFilterMetadata = {
    count: bigint;
    hasNext: boolean;
} | {
    count: number;
    hasNext: boolean;
}




//Novel Comment
export type NovelCommentWithMetadata = Prisma.NovelCommentGetPayload<{
    include: {
        profile: { select: { username: true, userId: true } },
        novelCommentReplys: { include: { profile: { select: { userId: true } } } },
        linkNovelCommentLikes: true,
        _count: { select: { linkNovelCommentLikes: true } }
    }
}> & { isOwner: boolean, isLiked: boolean, totalLikes: number };

export type NovelCommentReplyWithMetadata = Prisma.NovelCommentReplyGetPayload<{
    include: {
        profile: { select: { username: true, userId: true } },
        linkNovelCommentReplyLikes: true,
        _count: { select: { linkNovelCommentReplyLikes: true } }
    }
}> & { isOwner: boolean, isLiked: boolean, totalLikes: number }


//Chapter Comment
export type ChapterCommentWithMetadata = Prisma.ChapterCommentGetPayload<{
    include: {
        profile: { select: { username: true, userId: true } },
        chapterCommentReply: { include: { profile: { select: { userId: true } } } },
        LinkChapterCommentLike: true,
        _count: { select: { LinkChapterCommentLike: true } }
    }
}> & { isOwner: boolean, isLiked: boolean, totalLikes: number };

export type ChapterCommentReplyWithMetadata = Prisma.ChapterCommentReplyGetPayload<{
    include: {
        profile: { select: { username: true, userId: true } },
        linkChapterCommentReplyLike: true,
        _count: { select: { linkChapterCommentReplyLike: true } }
    }
}> & { isOwner: boolean; isLiked: boolean; totalLikes: number }