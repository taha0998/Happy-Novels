import { LucideHistory, LucideLogOut, LucideUserRound } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfilePath } from "@/lib/paths";

type AccountDropDownProps = {
  username: string;
};

const AccountDropDown = ({ username }: AccountDropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex justify-center items-center bg-background border border-foreground w-[41.5px] h-[41.5px] cursor-pointer select-none">
          {username[0].toUpperCase()}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44.75 mr-20 bg-background pl-1 rounded-[10px] border-foreground">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[18.84px]">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-foreground" />
        </DropdownMenuGroup>

        <DropdownMenuGroup className="text-20">
          <DropdownMenuItem asChild>
            <Link href={ProfilePath()}>
              <LucideUserRound className="w-[11.56px] h-3.25 text-foreground" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideHistory className="w-3.25 h-3.25 text-foreground" />
            History
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LucideLogOut className="w-3.25 h-3.25 text-foreground" />
            SIgn out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { AccountDropDown };
