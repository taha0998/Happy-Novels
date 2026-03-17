'use server';

import { getAuth } from "./get-auth";

export const getProfile = async () => {
    const { user } = await getAuth()
    if (!user) return undefined;

    const profile = user.profile[0]

    return profile
}