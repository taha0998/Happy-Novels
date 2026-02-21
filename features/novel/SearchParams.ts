import { createSearchParamsCache, parseAsInteger } from "nuqs/server";


export const paginationPageParser = parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    clearOnDefault: true
})

export const searchParamsCache = createSearchParamsCache({
    page: paginationPageParser
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>