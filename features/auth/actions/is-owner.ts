import { Profile } from "@prisma/client";

type Entity = { profileId: string }

export const isOwner = (
    authProfile: Profile | null | undefined,
    entity: Entity | null | undefined
) => {
    if (!authProfile || !entity) {
        return null
    }
    if (!entity.profileId) {
        return null
    }
    if (authProfile.id !== entity.profileId) {
        return null
    } else { return true }
}