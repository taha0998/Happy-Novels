import clsx from "clsx";
import { Button } from "@/components/ui/button";

type CommentLikeButtonProps = {
  likes: number;
  isLiked: boolean;
  onClick?: () => void;
  reply?: boolean;
};

const CommentLikeButton = ({
  likes,
  isLiked,
  onClick,
  reply,
}: CommentLikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={clsx("text-[31px] py-7 px-2 text-[#487593]", {
        "text-primary": isLiked,
        "hover:bg-[#487593]": isLiked,
        "text-[24.8px]": reply,
      })}
      onClick={onClick}
    >
      {isLiked ? "liked" : "like"}
      {likes === 0 ? "" : ` (${likes})`}
    </Button>
  );
};
export { CommentLikeButton };
