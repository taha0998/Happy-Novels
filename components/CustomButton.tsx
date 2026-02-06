import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
};

const CustomButton = ({
  variant,
  label,
  padding,
  active,
  fontSize,
}: CustomButtonProps) => {
  return (
    <RippleButton
      variant={variant ? variant : "default"}
      hoverScale={active ? 1 : 1.03}
      tapScale={1}
      className={cn(
        "flex justify-center select-none",
        padding ? padding : "px-7",
        active ? "bg-primary text-background" : "",
        fontSize ? fontSize : "",
      )}
    >
      <Link href={""}>{label}</Link>
      <RippleButtonRipples />
    </RippleButton>
  );
};

export { CustomButton };
