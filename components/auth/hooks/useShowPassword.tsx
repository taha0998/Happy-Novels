import { LucideEye, LucideEyeOff } from "lucide-react";
import { useState } from "react";

export const useShowPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const passwordType = isVisible ? "text" : "password";

  const toggleVisibility = () => setIsVisible((state) => !state);
  const eyeIcon = isVisible ? (
    <LucideEye
      className="size-8 absolute right-3 top-3 cursor-pointer"
      onClick={toggleVisibility}
    />
  ) : (
    <LucideEyeOff
      className="size-8 absolute right-3 top-3 cursor-pointer"
      onClick={toggleVisibility}
    />
  );

  return [eyeIcon, passwordType] as const;
};
