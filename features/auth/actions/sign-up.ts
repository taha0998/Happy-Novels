"use server"
import { hash } from "@node-rs/argon2"
import z from "zod";
import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";

const signUpShema = z.object({
    username: z.string().min(1).max(191),
    email: z.string().min(1, { message: 'Email is Required' }).max(191).email(),
    password: z.string().min(6, { message: 'Password need at least 6 characters' }).max(191),
    confirmPassword: z.string().min(6).max(191)
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password do not match',
            path: ['confirmPassword']
        })
    }
}

)


export const signUp = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { username, email, password } = signUpShema.parse(
            Object.fromEntries(formData)
        )
        const passwordHash = await hash(password)

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            }
        })
        await prisma.profile.create({
            data: {
                username,
                userId: user.id
            }
        })

        // const session = await 

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
}