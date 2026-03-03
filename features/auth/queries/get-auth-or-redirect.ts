'use server';

import { redirect } from "next/navigation";
import { SignUpPath } from "@/lib/paths";
import { getAuth } from "./get-auth";

export const getAuthOrRedirect = async () => {
    const auth = await getAuth();
    if (!auth) {
        redirect(SignUpPath())
    }
    return auth;
}