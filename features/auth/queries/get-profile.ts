'use server';

import { cache } from "react";
import { getAuthOrRedirect } from "./get-auth-or-redirect";

export const getProfile = cache(async () => {
    const { user } = await getAuthOrRedirect()
    if (!user) return undefined;

    const profile = user.profile[0]

    return profile
})