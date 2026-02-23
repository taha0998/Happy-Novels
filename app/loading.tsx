import { Spinner } from "@/components/Spinner";

const Loading = () => {
  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center self-center absolute z-20 bg-background">
      <Spinner />
    </div>
  );
};

export default Loading;
