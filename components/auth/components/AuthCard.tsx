import Image from "next/image";

type AuthCardProps = {
  form: React.ReactElement;
  title: string;
  img: string;
};

const AuthCard = ({ form, title, img }: AuthCardProps) => {
  return (
    <div className="flex flex-col w-[91%] self-center mt-7.5 animate-fade-in-top">
      <div className="flex w-[1206.92px] h-201.5 border-[3px] rounded-[16.65px] border-foreground justify-between self-center">
        <div className="flex flex-col w-[599.99px] justify-center items-center gap-15">
          <h2 className=" italic text-[55px]">{title}</h2>
          {form}
        </div>
        <div className="w-[599.99px] h-full rounded-r-[13.6px]">
          <Image
            src={img}
            alt="sign-up-image"
            width={599.99}
            height={800.59}
            className="rounded-r-[13.5px]"
          />
        </div>
      </div>
    </div>
  );
};

export { AuthCard };
