import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="none"
      className="text-[31.21px] w-full py-4 rounded-[9.71px]"
    >
      {pending && (
        <LucideLoaderCircle className=" animate-spin size-8.5 mr-1" />
      )}
      {label}
    </Button>
  );
};

export { SubmitButton };
