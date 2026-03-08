'use client';

import { Profile } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "./get-profile";

const useProfile = () => {
    const pathname = usePathname()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isFetched, setFetched] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await getProfile();
            setProfile(profile);
            setFetched(true)
        }
        fetchProfile()
    }, [pathname])

    return [profile, isFetched] as const;
}

export { useProfile };