"use server"
import { redirect } from "next/navigation"
import z from "zod"
import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state"
import { hashPassword } from "@/features/password/utils/hash-and-verify"
import { createSession } from "@/lib/oslo"
import { HomePath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"
import { generateRandomToken } from "@/utils/crypto"
import { setSessionCookie } from "../session-cookie"


const signUpShema = z.object({
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
    password: z.string().min(7, { message: "Password needs at least 7 characters" }).max(191),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }).max(191)
}).superRefine(({ email, password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password do not match',
            path: ['confirmPassword', 'password'],
        })
    };
    if (email === password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password cannot be the same as your email',
            path: ['password', 'email']
        })
    }
})

export const signUp = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = signUpShema.parse(
            Object.fromEntries(formData)
        )
        const passwordHash = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        const sessionToken = generateRandomToken();
        const session = await createSession(sessionToken, user.id)

        await setSessionCookie(sessionToken, session.expiresAt)

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(HomePath())
}