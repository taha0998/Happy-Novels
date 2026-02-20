import Link from "next/link";
import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import { cn } from "@/lib/utils";

type CustomButtonProps = {
  variant?:
    | "default"
    | "accent"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  label: string;
  padding?: string;
  active?: boolean;
  fontSize?: string;
  onClick?: () => void;
};

const CustomButton = ({
  variant,
  label,
  padding,
  active,
  fontSize,
  onClick,
}: CustomButtonProps) => {
  return (
    <RippleButton
      variant={variant ? variant : "default"}
      hoverScale={active ? 1 : 1.03}
      tapScale={1}
      className={cn(
        "flex justify-center select-none",
        padding ? padding : "px-7",
        active ? "bg-primary text-background " : "",
        fontSize ? fontSize : "",
      )}
      onClick={onClick}
    >
      <Link href={""}>{label}</Link>
      <RippleButtonRipples />
    </RippleButton>
  );
};

export { CustomButton };
