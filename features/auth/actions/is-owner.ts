import { User } from "@prisma/client";

type Entity = { profileId: string }

export const isOwner = (
    authUser: User | null | undefined,
    entity: Entity | null | undefined
) => {
    if (!authUser || !entity) {
        return null
    }
    if (!entity.profileId) {
        return null
    }
    if (authUser.id !== entity.profileId) {
        return null
    } else { return true }
}