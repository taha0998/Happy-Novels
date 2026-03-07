'use server';

import { redirect } from "next/navigation";
import { cache } from "react";
import { SignUpPath } from "@/lib/paths";
import { getAuth } from "./get-auth";

export const getAuthOrRedirect = cache(async () => {
    const auth = await getAuth();
    if (!auth) {
        redirect(SignUpPath())
    }
    return auth;
})