"use client";
import Image from "next/image";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const NovelComments = () => {
  return (
    <div className="flex flex-col gap-22.5 text-[35px]">
      <form className="flex flex-col">
        <label className="text-[50px] font-medium mb-7.5">Comments:</label>
        <div className="max-w-325.75 relative">
          <Textarea
            placeholder="Type your comment here..."
            className="lg:text-[35px] pb-33.25"
          />
          <SubmitButton
            label="Comment"
            className="w-50 px-[27.5] absolute bottom-7.5 right-7.5"
          />
        </div>
      </form>
      <div className="flex flex-col gap-7.5 max-w-325.75">
        <div className="flex gap-7.5">
          <Image
            src={
              "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNQ3FvZVz23lJavfGrjHKOopMWFsBzgkI1d5Dy"
            }
            alt="user logo"
            width={80}
            height={80}
            className="rounded-full max-h-20"
          />
          <p className=" line-clamp-2 font-medium">
            Speaking of which, I’d learned somewhere that birds are incontinent,
            but so are human babies. No matter how much my reasoning tells me to
            resistre human babies. No matter how much mySpeaking of which, I’d
            learned somewhere that birds are incontinent, but so are human
            babies. No matter how much my reasoning tells me to resistre human
            babies. No matter how much my
          </p>
        </div>
        <div className="flex gap-0 w-full justify-end items-center">
          <Button variant="ghost" className="text-[35px] py-7">
            reply
          </Button>
          <Button variant="ghost" className="text-[35px] py-7">
            like
          </Button>
        </div>
      </div>
      <div className="flex flex-col ml-27.5 gap-7.5 max-w-300">
        <div className="flex gap-7.5">
          <Image
            src={
              "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNQ3FvZVz23lJavfGrjHKOopMWFsBzgkI1d5Dy"
            }
            alt="user logo"
            width={80}
            height={80}
            className="rounded-full max-h-20"
          />
          <p className=" line-clamp-2 font-medium">
            Speaking of which, I’d learned somewhere that birds are incontinent,
            but so are human babies. No matter how much my reasoning tells me to
            resistre human babies. No matter how much mySpeaking of which, I’d
            learned somewhere that birds are incontinent, but so are human
            babies. No matter how much my reasoning tells me to resistre human
            babies. No matter how much my
          </p>
        </div>
        <div className="flex gap-0 w-full justify-end items-center">
          <Button variant="ghost" className="text-[35px] py-7">
            reply
          </Button>
          <Button variant="ghost" className="text-[35px] py-7">
            like
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-7.5 max-w-325.75">
        <div className="flex gap-7.5">
          <Image
            src={
              "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNQ3FvZVz23lJavfGrjHKOopMWFsBzgkI1d5Dy"
            }
            alt="user logo"
            width={80}
            height={80}
            className="rounded-full max-h-20"
          />
          <p className=" line-clamp-2 font-medium">
            Speaking of which, I’d learned somewhere that birds are incontinent,
            but so are human babies. No matter how much my reasoning tells me to
            resistre human babies. No matter how much mySpeaking of which, I’d
            learned somewhere that birds are incontinent, but so are human
            babies. No matter how much my reasoning tells me to resistre human
            babies. No matter how much my
          </p>
        </div>
        <div className="flex gap-0 w-full justify-end items-center">
          <Button variant="ghost" className="text-[35px] py-7">
            reply
          </Button>
          <Button variant="ghost" className="text-[35px] py-7">
            like
          </Button>
        </div>
      </div>
    </div>
  );
};
export { NovelComments };
