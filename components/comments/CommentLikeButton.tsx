import clsx from "clsx";
import { Button } from "../ui/button";

type CommentLikeButtonProps = {
  likes: number;
  isLiked: boolean;
  onClick?: () => void;
};

const CommentLikeButton = ({
  likes,
  isLiked,
  onClick,
}: CommentLikeButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={clsx("text-[30px] py-7 px-2 text-[#487593]", {
        "text-primary": isLiked,
        "hover:bg-[#487593]": isLiked,
      })}
      onClick={onClick}
    >
      {isLiked ? "liked" : "like"}
      {likes === 0 ? "" : ` (${likes})`}
    </Button>
  );
};
export { CommentLikeButton };
