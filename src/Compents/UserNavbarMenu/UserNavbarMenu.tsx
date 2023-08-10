import { BigHead } from "@bigheads/core";
import { LogOut, PlusSquare, Settings2, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function UserNavbarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-12 h-12">
          <BigHead
            accessory="shades"
            body="breasts"
            circleColor="blue"
            clothing="vneck"
            clothingColor="green"
            eyebrows="leftLowered"
            eyes="leftTwitch"
            faceMask={false}
            faceMaskColor="blue"
            facialHair="none2"
            graphic="vue"
            hair="afro"
            hairColor="blonde"
            hat="turban"
            hatColor="red"
            lashes={false}
            lipColor="red"
            mask
            mouth="serious"
            skinTone="light"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ahnaf Hasan Shifat</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link to={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings2 className="mr-2 h-4 w-4" />
          <Link to={"/profile?tab=setting"}>Setting</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PlusSquare className="mr-2 h-4 w-4" />
          <Link to='/place/new'>Add place</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNavbarMenu;
