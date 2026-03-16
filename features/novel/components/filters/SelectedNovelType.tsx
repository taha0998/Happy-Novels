import { CustomButton } from "@/components/CustomButton";

type SelectedNovelTypeProps = {
  name: string;
  count: number;
};

const SelectedNovelType = ({ name, count }: SelectedNovelTypeProps) => {
  return (
    <>
      <CustomButton
        variant={"outline"}
        label={`${name} ( ${count} )`}
        padding="px-9 py-6"
        fontSize="text-[25px] font-medium"
        active={true}
      />
    </>
  );
};
export { SelectedNovelType };
