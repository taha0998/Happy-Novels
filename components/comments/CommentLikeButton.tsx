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
      className={clsx("text-[35px] py-7 text-primary", {
        "text-[#487593]": isLiked,
        "hover:bg-[#487593]": isLiked,
      })}
      onClick={onClick}
    >
      {isLiked ? "liked" : "like"}({likes})
    </Button>
  );
};
export { CommentLikeButton };
