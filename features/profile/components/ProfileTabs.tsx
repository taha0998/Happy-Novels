import Link from "next/link";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NovelItem } from "@/features/novel/components/NovelItem";
import { FavoritePath, WatchingPath, WatchLaterPath } from "@/lib/paths";

export const TabsTriggerJsx = (name: string, path: string) => {
  return (
    <Link href={path} prefetch={false} className="w-full h-full">
      <TabsTrigger
        value={name}
        className="p-0 after:top-12.5 after:border-primary after:w-[115%] after:border-b-4 mr-15 cursor-pointer"
      >
        <p className="text-[38.75px]">{name}</p>
      </TabsTrigger>
    </Link>
  );
};

type TabsContentJsxProps = {
  id: string;
  title: string;
  coverImg: string;
};
export const TabsContentJsx = ({
  id,
  title,
  coverImg,
}: TabsContentJsxProps) => {
  return (
    <NovelItem id={id} title={title} coverImg={coverImg} profileList={true} />
  );
};

export const TabsListJsx = () => {
  return (
    <TabsList variant="line" className="p-0">
      {TabsTriggerJsx("Favorite", FavoritePath())}
      {TabsTriggerJsx("Watching", WatchingPath())}
      {TabsTriggerJsx("Watch later", WatchLaterPath())}
    </TabsList>
  );
};
