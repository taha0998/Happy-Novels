import { Profile } from "@prisma/client";

type DefaultProfileCardProps = {
  profile?: Profile;
  chapterReadCount?: number;
};

const DefaultProfileCard = ({
  profile,
  chapterReadCount,
}: DefaultProfileCardProps) => {
  return (
    <div className="w-107 h-120  bg-foreground rounded-b-[10px] relative bottom-10">
      <div className="flex flex-col items-center relative bottom-40">
        <div className="flex justify-center bg-background items-center w-66.25 h-66.25 rounded-full py-7.5 border-2 border-foreground ">
          <p className="font-normal text-[160px] text-foreground">
            {profile?.username[0].toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-3 text-background mt-7.5 ">
          <p className="text-[48.4375px]">{profile?.username}</p>
          <p className="text-[38.75px]">
            <span className=" underline">{chapterReadCount}</span> chapters read
          </p>
        </div>
      </div>
    </div>
  );
};
export { DefaultProfileCard };
