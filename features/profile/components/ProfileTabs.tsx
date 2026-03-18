import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NovelItem } from "@/features/novel/components/NovelItem";

//use nuqs to filter getProfileTabNovels ?tab=

const ProfileTabs = () => {
  const TabsTriggerJsx = (name: string) => {
    return (
      <TabsTrigger
        value={name}
        className="p-0 after:top-12.5 after:border-primary after:w-[115%] after:border-b-4 mr-15"
      >
        <p className="text-[38.75px]">{name}</p>
      </TabsTrigger>
    );
  };
  const TabsContentJsx = () => {
    return (
      <NovelItem
        id="cmmjb024p0001vhtkbu55m5in"
        title="Shadow Slave"
        coverImg="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNWAEpHA4oVxHX8Q1E9Rj4JigWzr7tZbCAUnu2"
        profileList={true}
      />
    );
  };

  return (
    <>
      <Tabs defaultValue="Favorite">
        <TabsList variant="line" className="p-0">
          {TabsTriggerJsx("Favorite")}
          {TabsTriggerJsx("Watching")}
          {TabsTriggerJsx("Watch later")}
        </TabsList>
        <div className="h-1 w-[95.6%] bg-foreground/30  mt-1.75 ml-px rounded-full"></div>
        <TabsContent value="Favorite">
          <div className="max-w-317 flex flex-wrap gap-7.25 mt-7.5">
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
            {TabsContentJsx()}
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
};
export { ProfileTabs };
