import clsx from "clsx";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommentLikeButton } from "./CommentLikeButton";

type ReplyProps = {
  isOwner: boolean;
  username: string;
  replyTo: string | null;
  content: string;
  deleteButton: React.ReactElement;
  deleteDialog: React.ReactElement;
  setShowReplyForm: (state: SetStateAction<boolean>) => void;
  likes: number;
  isLiked: boolean;
  handleLikeAction: () => Promise<void>;
  showReplyForm: boolean;
  replyForm: React.ReactElement;
};

const Reply = ({
  isOwner,
  username,
  replyTo,
  content,
  deleteButton,
  deleteDialog,
  setShowReplyForm,
  likes,
  isLiked,
  handleLikeAction,
  showReplyForm,
  replyForm,
}: ReplyProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const replyRef = useRef<HTMLParagraphElement>(null);

  const handleOpen = () => {
    if (isTruncated) {
      setOpen((state) => !state);
    }
  };

  useEffect(() => {
    const element = replyRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [replyRef]);

  return (
    <>
      <div className="flex gap-7.5">
        <Image
          src={
            "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNQ3FvZVz23lJavfGrjHKOopMWFsBzgkI1d5Dy"
          }
          alt="user logo"
          width={80}
          height={80}
          className="rounded-full h-20 w-20"
        />
        <p
          className={clsx("font-medium text-[31px]", {
            "line-clamp-2": !isOpen,
            "cursor-pointer": !isOpen && isTruncated,
            "cursor-default": !isTruncated,
          })}
          ref={replyRef}
          onClick={handleOpen}
        >
          <span
            className={clsx("", {
              "text-[#FE5311]": isOwner,
              "text-primary": !isOwner,
            })}
          >
            @{username}:{" "}
          </span>
          <span className="text-[rgb(79,128,161)]">
            {replyTo ? `@${replyTo} ` : ""}
          </span>
          {content}
        </p>
      </div>
      <div>
        <div className="flex gap-0 w-full justify-end items-center">
          {isOwner && (
            <>
              {deleteButton}
              {deleteDialog}
            </>
          )}

          <Button
            variant="ghost"
            className="text-[24.8px] py-7 px-2 text-[#385A71] hover:bg-foreground"
            onClick={() => setShowReplyForm((state) => !state)}
          >
            reply
          </Button>
          <CommentLikeButton
            likes={likes}
            isLiked={isLiked}
            onClick={handleLikeAction}
            reply={true}
          />
        </div>
      </div>
      {showReplyForm && replyForm}
    </>
  );
};
export { Reply };
