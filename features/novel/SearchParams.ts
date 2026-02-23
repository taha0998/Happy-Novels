import { createSearchParamsCache, parseAsInteger } from "nuqs/server";


export const paginationPageParser = parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    clearOnDefault: true
})

export const chaptersPaginationParser = parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    clearOnDefault: true
})

export const searchParamsCache = createSearchParamsCache({
    page: paginationPageParser,
    chaptersPage: chaptersPaginationParser
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>