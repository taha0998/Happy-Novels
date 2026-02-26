"use server"
import { hash } from "@node-rs/argon2"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"
import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state"
import { lucia } from "@/lib/lucia"
import { HomePath } from "@/lib/paths"
import { prisma } from "@/lib/prisma"


const signUpShema = z.object({
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
    password: z.string().min(1, { message: "Password is required" }).max(191),
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
        const passwordHash = await hash(password)

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        // TODO sessionLOGIC 3awdo
        // const session = await lucia.createSession(user.id, {});

        // const sessionCookie = lucia.createSessionCookie(session.id);
        // (await cookies()).set(
        //     sessionCookie.name,
        //     sessionCookie.value,
        //     sessionCookie.attributes
        // )

    } catch (error) {
        return fromErrorToActionState(error, formData)
    }
    redirect(HomePath())
}