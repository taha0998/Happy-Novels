import { AddNovelToButton } from "@/components/buttons/AddNovelToButton";
import { checkNovelFavorite } from "../actions/check-novel-favorite";
import { checkNovelWatchLater } from "../actions/check-novel-watch-later";
import { checkNovelWatching } from "../actions/check-novel-watching";

const NovelAddToButtonsGroup = async () => {
  const novelId = "cmmjarau00000vhtkorpkcz6h";
  //   const [existFavorite, existWatching, existWatchLater] = await Promise.all([]);
  const isAddedFavorite = await checkNovelFavorite(novelId);
  const isAddedWatching = await checkNovelWatching(novelId);
  const isAddedWatchLater = await checkNovelWatchLater(novelId);

  return (
    <>
      <AddNovelToButton to="Favorite" isAdded={isAddedFavorite} />
      <AddNovelToButton to="Watching" isAdded={isAddedWatching} />
      <AddNovelToButton to="Watch later" isAdded={isAddedWatchLater} />
    </>
  );
};
export { NovelAddToButtonsGroup };
