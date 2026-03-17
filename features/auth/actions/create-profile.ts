"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { HomePath } from "@/lib/paths";
import { prisma } from "@/lib/prisma";
import { getAuth } from "../queries/get-auth";


const createProfileShema = z.object({
    username: z.string().min(5, { message: '5 characters min' }).max(25)
})

export const createProfile = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { username } = createProfileShema.parse(
            Object.fromEntries(formData)
        )
        const { user } = await getAuth();
        if (!user) return toActionState('ERROR', 'Not authorized');

        const existingUsername = await prisma.profile.findUnique({
            where: { username }
        })
        if (existingUsername) {
            return {
                status: "ERROR",
                message: '',
                fieldError: {
                    username: ['This username is already taken']
                },
                payload: formData,
                timestamp: Date.now()
            } as ActionState
        }

        await prisma.profile.create({
            data: {
                username,
                userId: user.id
            }
        })

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    revalidatePath(HomePath())
    redirect(HomePath())
}