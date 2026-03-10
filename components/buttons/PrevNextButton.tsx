"use client";
import { LucideArrowBigLeft, LucideArrowBigRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ChapterPath } from "@/lib/paths";
import { Button } from "../ui/button";

type PrevNextButtonProps = {
  value: "next" | "prev";
  url: string;
};

const PrevNextButton = ({ value, url }: PrevNextButtonProps) => {
  const next = value === "next";

  const router = useRouter();
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" && next) {
        router.push(ChapterPath(url));
      } else if (e.key === "ArrowLeft" && !next) {
        router.push(ChapterPath(url));
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [next, url, router]);

  return (
    <Button className="w-[83.69px] h-[83.69px] bg-foreground" asChild>
      <Link href={ChapterPath(url)}>
        {next ? (
          <LucideArrowBigRight className="size-14.25" />
        ) : (
          <LucideArrowBigLeft className="size-14.25" />
        )}
      </Link>
    </Button>
  );
};

export { PrevNextButton };
