import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center self-center z-20 bg-background">
      <LucideLoaderCircle className="h-16 w-16 animate-spin text-foreground" />
    </div>
  );
};
export { Spinner };
