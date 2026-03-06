'use server'

import { revalidatePath } from "next/cache";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { NovelPath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";

export const addNovelCommentLike = async (novelCommentId: string, novelId: string,) => {
    const { user } = await getAuthOrRedirect();

    if (!user) {
        return;
    }

    const novelComment = await prisma.novelComment.findUnique(
        { where: { id: novelCommentId } }
    );
    if (!novelComment) {
        return;
    }

    await prisma.linkNovelCommentLikes.create({
        data: {
            profileId: user.profile[0].id,
            NovelCommentId: novelComment.id
        }
    })
    revalidatePath(NovelPath(novelId))
}