import { Suspense } from "react";
import { AddNovelToTriggleButton } from "@/components/buttons/AddNovelToTriggleButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NovelAddToButtonsGroup } from "./NovelAddToButtonsGroup";

const NovelAddToDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <AddNovelToTriggleButton />
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent showCloseButton={false} className="min-w-155 min-h-115">
          <DialogHeader className="flex gap-5 justify-center items-center">
            <Suspense fallback={"loading..."}>
              <NovelAddToButtonsGroup />
            </Suspense>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export { NovelAddToDialog };
