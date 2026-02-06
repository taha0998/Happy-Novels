import Image from "next/image";
import { CustomButton } from "../../components/CustomButton";

const Header = () => {
  return (
    <nav className="flex w-[90%] justify-between items-center self-center mt-1 select-none ">
      <div className="flex justify-start items-center">
        <Image
          src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNzHsNR3flRbkGJp1tN2PC5WaLxHBD7TqQOgc9"
          alt="happy novels logo"
          width={114.66}
          height={73.99}
          unoptimized={true}
          loading="eager"
        />
      </div>
      <div className="flex gap-5 items-center">
        <div className="theme-switcher"></div>
        <div className="theme-changer"></div>
        <CustomButton label="Sign Up" variant={"outline"} padding=" px-6" />
        <CustomButton label="Sign In" />
        <CustomButton label="Donate" variant={"destructive"} padding=" px-4" />
      </div>
    </nav>
  );
};
export { Header };
