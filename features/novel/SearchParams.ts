import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";


export const paginationPageParser = parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    clearOnDefault: true
})

export const chaptersPaginationParser = parseAsInteger.withDefault(0).withOptions({
    shallow: false,
    clearOnDefault: true
})

export const filterNovelsParser = parseAsString.withDefault('highest_rate').withOptions({
    shallow: false,
    clearOnDefault: true
})

export const hotFilterTimeParser = parseAsString.withDefault('').withOptions({
    shallow: false,
    clearOnDefault: true,
})

export const typeFilterParser = parseAsString.withDefault('').withOptions({
    shallow: false,
    clearOnDefault: true
})

export const searchParser = parseAsString.withDefault('').withOptions({
    shallow: false,
    clearOnDefault: true
})


export const searchParamsCache = createSearchParamsCache({
    search: searchParser,
    page: paginationPageParser,
    chaptersPage: chaptersPaginationParser,
    filterNovels: filterNovelsParser,
    hotFilterTime: hotFilterTimeParser,
    typeNovels: typeFilterParser
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>