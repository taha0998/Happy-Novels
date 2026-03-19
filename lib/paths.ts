export const HomePath = () => '/'
export const SignUpPath = () => '/sign-up'
export const SignInPath = () => '/sign-in'
export const NovelPath = (novelId: string) => `/novels/${novelId}`
export const ChapterPath = (chapterId: string) => `/chapters/${chapterId}`
export const TypePath = (type: string) => `/?filterNovels=types&typeNovels=${type}`
export const AllTypesPath = () => '/?filterNovels=types'
export const ProfilePath = () => '/profile'
export const FavoritePath = () => '/profile/favorite'
export const WatchingPath = () => '/profile/watching'
export const WatchLaterPath = () => '/profile/watch_later'