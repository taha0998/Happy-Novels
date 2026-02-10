import Image from "next/image";
import Link from "next/link";

const NovelItem = () => {
  return (
    <div className="flex flex-col w-86.25">
      <Link href="#">
        <Image
          src="https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNolniHqNgfov6R2tmYOZnQzeialHVdbAXJEsr"
          alt="Novel {Title}"
          width={344.76}
          height={494.73}
          className=" rounded-[10px] border-4 border-primary"
        />
        <h3 className="text-[25px] font-medium line-clamp-2 ">
          To Be a Power in the Shadows!To Be a Power in the Shadows!To Be a
          Power in the Shadows!
        </h3>
      </Link>
    </div>
  );
};

export { NovelItem };
