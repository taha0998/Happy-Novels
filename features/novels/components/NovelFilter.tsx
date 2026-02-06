"use client";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";

const NovelFilter = () => {
  return (
    <div className=" flex justify-between items-center mt-20" id="id">
      <div className="flex gap-5">
        <CustomButton
          variant={"outline"}
          label="Latest"
          padding="px-9 py-6"
          fontSize="text-[28px]"
        />
        <CustomButton
          variant={"outline"}
          label="Hot"
          padding="px-9 py-6"
          fontSize="text-[28px]"
        />
        <CustomButton
          variant={"outline"}
          label="Most watched"
          padding="px-9 py-6"
          fontSize="text-[28px]"
        />
        <CustomButton
          variant={"outline"}
          label="Hightest rate"
          padding="px-9 py-6"
          fontSize="text-[28px]"
          active
        />
        <CustomButton
          variant={"outline"}
          label="Types"
          padding="px-9 py-6"
          fontSize="text-[28px]"
        />
      </div>
      <div className="flex justify-center items-center">
        <CustomInput />
      </div>
    </div>
  );
};
export { NovelFilter };
