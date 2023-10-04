import { BigHead } from "@bigheads/core";
import { LogOut, PlusSquare, Settings2, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserThunk } from "../../slices/AuthSlice";
import { RootState } from "../../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function UserNavbarMenu() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUserThunk() as any);
    window.location.href = "/";
  };

  if (auth.loading) return <div></div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-12 h-12 relative -top-1">
          <BigHead {...user?.avatar} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link to={`/profile/${user?.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings2 className="mr-2 h-4 w-4" />
          <Link to={`/profile/${user?.id}?tab=setting`}>Setting</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PlusSquare className="mr-2 h-4 w-4" />
          <Link to="/place/new">Add place</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNavbarMenu;
