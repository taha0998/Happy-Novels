import Link from "next/link";
import { CustomButton } from "@/components/CustomButton";
import { AllTypesPath } from "@/lib/paths";

type SelectedNovelTypeProps = {
  name: string;
  count: number;
  constLoading?: boolean;
};

const SelectedNovelType = ({
  name,
  count,
  constLoading,
}: SelectedNovelTypeProps) => {
  return (
    <>
      <Link href={AllTypesPath()}>
        <CustomButton
          variant={"outline"}
          label={`${name} ( ${constLoading ? "..." : count} )`}
          padding="px-9 py-6"
          fontSize="text-[25px] font-medium"
          active={true}
        />
      </Link>
    </>
  );
};
export { SelectedNovelType };
