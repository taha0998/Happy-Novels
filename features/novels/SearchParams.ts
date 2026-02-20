import { createSearchParamsCache, parseAsInteger } from "nuqs/server";


export const paginationPageParser = {
    page: parseAsInteger.withDefault(0),
    size: parseAsInteger.withDefault(20),
}
export const paginationPageOptions = {
    shallow: false,
    clearOnDefault: true
}

export const searchParamsCache = createSearchParamsCache({
    ...paginationPageParser
})
export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>